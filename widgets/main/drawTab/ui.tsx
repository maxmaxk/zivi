import { Draw2D } from '../draw2d'
import { Draw3D } from '../draw3d'
import { ENavTabs } from '../navbar'
import { type IDrawTab } from './types'

export const DrawTab = ({ tab }: IDrawTab): JSX.Element => {
  switch (tab) {
    case ENavTabs.Draw3D: return <Draw3D/>
    case ENavTabs.Draw2D: return <Draw2D/>
  }
}
