import { IRegisterUserDTO } from '@/dtos/IRegisterUserDTO'
import { prisma } from '@/lib/prisma'
import { Users } from '@prisma/client'
import { UsersRepository } from '../usersRepository'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password }: IRegisterUserDTO): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
