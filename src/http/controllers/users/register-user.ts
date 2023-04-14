import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/useCases/register-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    await registerUserUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }

    throw err
  }

  return reply.status(201).send()
}
