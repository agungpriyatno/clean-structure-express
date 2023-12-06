import db from "@/config/db"
import { TKeyDto } from "@/types/dto"
import { Account, Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

export type TAccountRepository = {
    find(body: TFindAccountDto): Promise<Account>
    create(body: TCreateAcountDto): Promise<Account>
    update(body: TUpdateAcountDto): Promise<Account>
}

export type TAccountDto = {
    email?: string,
    hash?: string,
    validatedAt?: Date
}

export type TFindAccountDto = TKeyDto
export type TUpdateAcountDto = TKeyDto & TAccountDto
export type TCreateAcountDto = TUpdateAcountDto & TAccountDto & { name: string }

export class AccountRepository implements TAccountRepository {

    constructor(private readonly dataAccess: Prisma.AccountDelegate<DefaultArgs>) { }

    static build(dataAccess: Prisma.AccountDelegate<DefaultArgs>) {
        return new AccountRepository(dataAccess)
    }

    create(body: TCreateAcountDto): Promise<{ id: string; userId: string; email: string; hash: string; validatedAt: Date; createdAt: Date; updatedAt: Date }> {
        throw new Error("Method not implemented.")
    }
    
    update(body: TUpdateAcountDto): Promise<{ id: string; userId: string; email: string; hash: string; validatedAt: Date; createdAt: Date; updatedAt: Date }> {
        throw new Error("Method not implemented.")
    }

    
    find({ key }: TFindAccountDto): Promise<Account> {
        return  this.dataAccess.findFirst({ where: { OR: [{ id: key }, { email: key }] } })
    }

}

const acciountRepo = new AccountRepository(db.account)
const account = AccountRepository.build(db.account)