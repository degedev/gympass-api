import { CheckIns, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create({
    gym_id,
    user_id,
  }: Prisma.CheckInsUncheckedCreateInput): Promise<CheckIns>
}
