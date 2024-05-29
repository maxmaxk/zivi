export interface INavbar {
  tab: ENavTabs
  setTab: (tab: ENavTabs) => void
}

export enum ENavTabs {
  Draw3D,
  Draw2D
}

export interface INavItems {
  title: string
  tab: ENavTabs
}
