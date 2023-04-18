import { prisma } from '@/lib/prisma'
import { Prisma, Users } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create({
    name,
    email,
    password_hash,
  }: Prisma.UsersCreateInput): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password_hash,
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

  async findById(id: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
