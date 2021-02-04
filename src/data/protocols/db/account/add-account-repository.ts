import { AccountModel } from '../../../../domain/models/SurveyModel'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
