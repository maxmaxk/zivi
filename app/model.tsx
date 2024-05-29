import { type ReactNode } from 'react'
import { Main } from 'pages/main'
import { Header } from 'widgets/header'

export const getPage = (page: JSX.Element, isLogin?: boolean): ReactNode => {
  const content = (isLogin === true) || (isLogin === undefined) ? page : <Main/>
  return (
    <>
      <Header/>
      {content}
    </>
  )
}
