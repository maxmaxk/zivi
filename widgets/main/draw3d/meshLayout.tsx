/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { type IMeshLayout } from './types'

export const MeshLayout = (props: IMeshLayout): JSX.Element => {
  const { threeObject, material } = props
  return (
    <primitive
    object={threeObject}
    dispose={null}
    scale={1}
    children-0-material={material}/>
  )
}
