import { Gyms, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  items: Gyms[] = []

  async create(data: Prisma.GymsCreateInput): Promise<Gyms> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gyms | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
