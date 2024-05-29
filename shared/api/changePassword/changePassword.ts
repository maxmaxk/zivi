import axios from 'axios'
import config from 'app/config'
import { type IChangePasswordRequest } from './types'

export const changePasswordRequest = async (props: IChangePasswordRequest): Promise<string> => {
  const { id, password } = props
  return await axios.post(
    `${config.BACKEND_ADDRESS as string}api/Auth/setPassword`,
    { id, password }
  )
}
