import { IRegisterUserDTO } from '@/dtos/IRegisterUserDTO'
import { Users } from '@prisma/client'

export interface UsersRepository {
  create({ name, email, password }: IRegisterUserDTO): Promise<Users>
  findByEmail(email: string): Promise<Users | null>
}
