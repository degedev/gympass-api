import { Prisma, Users } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  items: Users[] = []

  async create({ name, email, password_hash }: Prisma.UsersCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
