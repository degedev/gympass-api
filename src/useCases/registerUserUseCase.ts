import { IRegisterUserDTO } from '@/dtos/IRegisterUserDTO'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function registerUserUseCase({
  name,
  email,
  password,
}: IRegisterUserDTO) {
  const userWithSameEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const password_hash = await hash(password, 8)

  await prisma.users.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
