import { CheckIns, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIns | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIns[]>
  countByUserId(userId: string): Promise<number>
}
