import axios from 'axios'
import config from 'app/config'
import { type IChangeMailRequest } from './types'

export const changeMailRequest = async ({ id }: IChangeMailRequest): Promise<string> => {
  return await axios.post(
    `${config.BACKEND_ADDRESS as string}api/auth/changemail`,
    { id }
  )
}
