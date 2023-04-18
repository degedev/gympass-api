import { Prisma, Users } from '@prisma/client'

export interface UsersRepository {
  create({
    name,
    email,
    password_hash,
  }: Prisma.UsersCreateInput): Promise<Users>
  findByEmail(email: string): Promise<Users | null>
  findById(id: string): Promise<Users | null>
}
