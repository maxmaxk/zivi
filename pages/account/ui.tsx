import { useEffect } from 'react'
import { useAccountStore, useOrderCardStore, usePacksStore } from 'entities/hooks/useStores'
import { Navbar, ENavTabs } from 'widgets/account/navbar'
import { TabPage } from 'widgets/account/tabPage'
import { useParams } from 'react-router'

export const Account = (): JSX.Element => {
  const { tabnum } = useParams()
  const accountStore = useAccountStore()
  const packsStore = usePacksStore()
  const orderCardStore = useOrderCardStore()
  useEffect(() => {
    accountStore.getUserInfo()
    packsStore.getBuySchema()
    orderCardStore.getManufactors()
  }, [])
  const tab = tabnum ? parseInt(tabnum) : ENavTabs.Orders as number
  return (
    <>
      <Navbar tab={tab}/>
      <TabPage tab={tab}/>
    </>
  )
}
