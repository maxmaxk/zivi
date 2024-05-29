import { observer } from 'mobx-react'
import { useUserStore } from 'entities/hooks/useStores'
import { GuestUserMenu } from '../guestUserMenu'
import { LoginedUserMenu } from '../loginedUserMenu'
import { ELoginStatus } from 'entities/stores/user/types'

export const BoxMenu = observer((): JSX.Element => {
  const userStore = useUserStore()
  const isLoginStyle = userStore.loginStatus === ELoginStatus.Logined || userStore.loginStatus === ELoginStatus.Logining
  return isLoginStyle ? <LoginedUserMenu/> : <GuestUserMenu/>
})
