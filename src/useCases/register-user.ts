import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { Users } from '@prisma/client'

interface IRegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}
interface IRegisterUserUseCaseResponse {
  user: Users
}
export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUserUseCaseRequest): Promise<IRegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
