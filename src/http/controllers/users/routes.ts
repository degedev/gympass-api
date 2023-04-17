import { FastifyInstance } from 'fastify'
import { registerUserController } from './register-user'
import { authenticateUserController } from './authenticate-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
}
