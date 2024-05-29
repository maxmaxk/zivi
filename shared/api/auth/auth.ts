import axios from 'axios'
import config from 'app/config'

export const authRequest = async (login: string, password: string): Promise<string> => {
  return await axios.post(
    `${config.BACKEND_ADDRESS as string}api/auth/login`,
    { login, password }
  )
}
