import type { ISelectType } from 'entities/stores/types'
import { ELawStatus } from 'shared/api/makeRegistration'

export const options: ISelectType[] = [
  { value: ELawStatus.Physical, label: 'Физическое лицо' },
  { value: ELawStatus.Private, label: 'ИП' },
  { value: ELawStatus.Entity, label: 'Юридическое лицо' }
]
