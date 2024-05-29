import * as THREE from 'three'
import { type IPointLight } from './types'

export const defaultCameraCoord: [number, number, number] = [10, 10, 10]
export const pointLights1: IPointLight[] = [
  {
    position: [0, 0, 10],
    intensity: 500
  },
  {
    position: [0, 0, -10],
    intensity: 500
  },
  {
    position: [10, 10, 0],
    intensity: 700
  },
  {
    position: [20, -20, 0],
    intensity: 1200
  },
  {
    position: [-10, -10, 0],
    intensity: 700
  },
  {
    position: [-20, 20, 0],
    intensity: 1200
  }
]
export const pointLights2: IPointLight[] = [
  {
    position: [0, 0, 10],
    intensity: 50
  },
  {
    position: [0, 0, -10],
    intensity: 50
  },
  {
    position: [10, 10, 0],
    intensity: 700
  },
  {
    position: [20, -20, 0],
    intensity: 1200
  },
  {
    position: [-10, -10, 0],
    intensity: 700
  },
  {
    position: [-20, 20, 0],
    intensity: 1200
  }
]

export const shapeMaterialProps = {
  color: 0x999999,
  side: THREE.DoubleSide
}

export const outBoxMaterialProps = {
  color: 0x0000FF,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.1,
  depthWrite: false
}
export const vergesMaterialProps = {
  color: 0x000000,
  side: THREE.DoubleSide
}
export const sizesMaterialProps = {
  color: 0x000000,
  side: THREE.DoubleSide
}
export const fileRegexp = /[^a-zа-я0-9]/gi
export const logoBoxSize = 250
export const logoTitle = 'zakaz-ivi.online'
