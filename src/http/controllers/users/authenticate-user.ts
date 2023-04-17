import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/useCases/authenticate-user'
import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    await authenticateUserUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }

    throw err
  }

  return reply.status(200).send()
}
