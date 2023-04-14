import { IRegisterUserDTO } from '@/dtos/IRegisterUserDTO'

import { UsersRepository } from '@/repositories/usersRepository'
import { hash } from 'bcryptjs'

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: IRegisterUserDTO) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const password_hash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return user
  }
}
