import { type ERenderStatus } from 'entities/stores/render/types'
import type { ELigthType } from 'shared/api/renderModel'

export interface IPointLight {
  position: [number, number, number]
  intensity: number
}

export interface IControl3D {
  productShape: IProductShape | null
  closeHandler?: () => void
}

export interface IInfoMessage {
  renderStatus: ERenderStatus
}

export interface IProductShape {
  shapes: THREE.Group
  verges: THREE.Group | null
  sizes: THREE.Group | null
  outBox: THREE.Group | null
  lightType: ELigthType
}

export interface IMeshLayout {
  threeObject: THREE.Group
  material: THREE.MeshBasicMaterial
}
