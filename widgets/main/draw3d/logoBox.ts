import { Shapes } from 'shared/api/renderModel/models/shapes/shapes'
import logo from './logo.jpg'
import helvetiker_regular from 'shared/fonts/helvetiker_regular.typeface.json'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { logoBoxSize, logoTitle } from './consts'
import { defaultOutBoxMargin } from 'shared/api/renderModel/models/primitives/consts'

export const logoBox = new Array<THREE.BoxGeometry | null>(6).fill(null).map(_ => { return new THREE.BoxGeometry(logoBoxSize, logoBoxSize, 0) })

logoBox[0].translate(0, 0, -logoBoxSize / 2)
logoBox[1].rotateY(Shapes.degreesToRadians(90))
logoBox[1].translate(-logoBoxSize / 2, 0, 0)
logoBox[2].rotateX(Shapes.degreesToRadians(90))
logoBox[2].translate(0, -logoBoxSize / 2, 0)
logoBox[3].translate(0, 0, logoBoxSize / 2)
logoBox[4].rotateY(Shapes.degreesToRadians(90))
logoBox[4].translate(logoBoxSize / 2, 0, 0)
logoBox[5].rotateX(Shapes.degreesToRadians(90))
logoBox[5].translate(0, logoBoxSize / 2, 0)

const texture = new THREE.TextureLoader().load(logo)
texture.colorSpace = THREE.SRGBColorSpace
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(3, 3)

const font = new FontLoader().parse(helvetiker_regular)

export const logoText = new TextGeometry(logoTitle, {
  font,
  size: 16,
  curveSegments: 12
})
logoText.scale(1, 1, 0.01)
logoText.rotateY(Shapes.degreesToRadians(45))
logoText.translate(-logoBoxSize, -25, -logoBoxSize / 2 + defaultOutBoxMargin)

export const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  opacity: 0.15
})
