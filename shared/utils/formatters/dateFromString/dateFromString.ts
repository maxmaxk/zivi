import moment from 'moment'

export const dateFromString = (value: string | null, nullValue: string = ''): string => value ? moment(value).format('DD.MM.YY') : nullValue
