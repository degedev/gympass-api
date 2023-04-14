import { FastifyInstance } from 'fastify'
import { registerUserController } from './register-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
}
