import { Gyms, Prisma } from '@prisma/client'

export interface GymsRepository {
  create(data: Prisma.GymsCreateInput): Promise<Gyms>
  findById(id: string): Promise<Gyms | null>
}
