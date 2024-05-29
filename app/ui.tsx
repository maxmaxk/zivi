import { useCallback, useEffect } from 'react'
import { flowResult } from 'mobx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ErrorBoundary } from 'react-error-boundary'
import { axiosWithInterceptors } from 'shared/axios/axiosWithInterceptors'
import { useRootStore, useUserStore } from 'entities/hooks/useStores'
import { ReactNotifications } from 'react-notifications-component'
import { getPage } from './model'
import { Waiting } from 'widgets/waiting'
import { InviteRecovery } from 'pages/inviteRecovery'
import { Account } from 'pages/account'
import { NotFound } from 'pages/notFound'
import { Error } from 'pages/error'
import { Footer } from 'widgets/footer'
import { Body } from './body'
import { ChangeMail } from 'pages/changemail'
import { OrderCard } from 'pages/orderCard/ui'
import 'react-notifications-component/dist/theme.css'
import { Main } from 'pages/main'
import { LogCalcs } from 'pages/logCalcs'
import { Notifications } from 'entities/stores/common/notifications'
import { ELoginStatus } from 'entities/stores/user/types'
import { ProductCard } from 'pages/productCard'

const App = observer((): JSX.Element => {
  const userStore = useUserStore()
  const { setWaiting } = useRootStore()
  useEffect(() => {
    axiosWithInterceptors(setWaiting)
    void flowResult(userStore.getUser())
    const notifications = new Notifications()
    notifications.setHandler(userStore.logout)
  }, [])
  const beforeunloadHandler = useCallback((e: any): void => {
    e.preventDefault()
  }, [])
  const isLogin = userStore.loginStatus === ELoginStatus.Logined || userStore.loginStatus === ELoginStatus.Logining
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={getPage(<Account/>, isLogin)}/>
        <Route path="/hide-letters" element={getPage(<Main/>)}/>
        <Route path="/invite/:id" element={getPage(<InviteRecovery/>)}/>
        <Route path="/recovery/:id" element={getPage(<InviteRecovery/>)}/>
        <Route path="/changemail/:id" element={getPage(<ChangeMail/>)}/>
        <Route path="/log-calcs/:id" element={getPage(<LogCalcs/>, isLogin)}/>
        <Route path="/product/:id" element={getPage(<ProductCard/>, isLogin)}/>
        <Route path="/account/:tabnum" element={getPage(<Account/>, isLogin)}/>
        <Route path="/ordercard/:idOrder/:idManufactor" element={getPage(<OrderCard beforeunloadHandler={beforeunloadHandler}/>, isLogin)}/>
        <Route path="*" element={<NotFound/>}/>
      </>
    )
  )
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ReactNotifications/>
      <Waiting/>
      <Body>
        <RouterProvider router={router} />
        <Footer/>
      </Body>
    </ErrorBoundary>
  )
})

export default App
