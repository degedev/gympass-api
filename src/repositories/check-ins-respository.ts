import { CheckIns, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIns | null>
}
