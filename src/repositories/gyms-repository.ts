import { Gyms } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gyms | null>
}
