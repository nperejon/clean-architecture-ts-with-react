import { SetStorage } from '@/data/protocols/cash/set-storage'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}
  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError()
    await this.setStorage.set('account', JSON.stringify(account))
    return await Promise.resolve()
  }
}
