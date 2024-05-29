/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  defaultCameraCoord,
  shapeMaterialProps,
  outBoxMaterialProps,
  vergesMaterialProps,
  sizesMaterialProps,
  pointLights1,
  pointLights2
} from './consts'
import styles from './styles.module.scss'
import type { IProductShape, IControl3D } from './types'
import { MeshLayout } from './meshLayout'
import { downloadFile } from 'features/downloadLink/model'
import { EIconButtonType, IconButton } from 'features/iconButton'
import { PopupIconButton } from 'features/popupIconButton'
import { CloseIcon } from 'features/closeIcon'
import { useCalculationStore, useRenderStore } from 'entities/hooks/useStores'
import { getFileName } from './infoMessage'
import { observer } from 'mobx-react'
import { ELigthType } from 'shared/api/renderModel'
import { logoBox, logoText, material } from './logoBox'

export const Control3D = observer((props: IControl3D): JSX.Element => {
  const { productShape, closeHandler } = props
  const renderStore = useRenderStore()
  const calculationStore = useCalculationStore()
  const { calcStatus, calcResult } = calculationStore
  const [cameraCoord, setCameraCoord] = useState<[number, number, number]>(defaultCameraCoord)
  const ref = useRef(null)
  const canvas = ref.current as unknown as HTMLCanvasElement
  useEffect(() => {
    if (canvas) {
      canvas.addEventListener('webglcontextlost', () => {
        renderStore.reopenModel()
      })
    }
  }, [canvas])
  const resetHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setCameraCoord([...defaultCameraCoord])
  }
  const pickImageHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const canvas = ref.current as unknown as HTMLCanvasElement
    const fileName = getFileName(calcStatus, calcResult)
    downloadFile(canvas.toDataURL(), fileName)
  }
  const Scene = (): JSX.Element => {
    const { camera } = useThree()
    camera.position.set(...cameraCoord)
    return <></>
  }

  const shapeMaterial = new THREE.MeshLambertMaterial(shapeMaterialProps)
  const outBoxMaterial = new THREE.MeshLambertMaterial(outBoxMaterialProps)
  const vergesMaterial = new THREE.MeshLambertMaterial(vergesMaterialProps)
  const sizesMaterial = new THREE.MeshLambertMaterial(sizesMaterialProps)
  const getCanvasStyle = (productShape: IProductShape | null, closeHandler: undefined | (() => void)): string => {
    if (!productShape) return styles.hideCanvas
    if (!closeHandler) return styles.canvasContainer
    return styles.canvasFullscreenContainer
  }
  const pointLights = productShape?.lightType === ELigthType.Light1 ? pointLights1 : pointLights2
  return (
    <div className={ getCanvasStyle(productShape, closeHandler) }>
      <div className={styles.panel}>
        <IconButton title='Сделать скриншот текущего вида' buttonType={EIconButtonType.PickImage} onClickHandler={pickImageHandler}/>
        { !closeHandler && <PopupIconButton<IControl3D>
            iconType={EIconButtonType.FullScreen}
            iconTitle='Просмотр в отдельном окне'
            iconDisabled={false}
            popupProps={{ productShape }}
            popupContent={(props) => (<Control3D {...props}/>)}
          />
        }
        <IconButton title='Сбросить на исходный вид' buttonType={EIconButtonType.ResetZoom} onClickHandler={resetHandler}/>
      </div>
      {closeHandler && <CloseIcon onClose={closeHandler} iconStyle='success'/>}
      <Canvas
        frameloop='demand'
        gl={{ preserveDrawingBuffer: true }}
        ref={ref}>
        <OrbitControls enablePan={false}/>
        <Scene/>
        {
          pointLights.map((pointLight, index) => (
            <pointLight key={index} position={pointLight.position} intensity={pointLight.intensity}/>
          ))
        }
        <mesh>
          {(productShape !== null) &&
            <>
              {logoBox.map((item, index) => (
                <primitive key={index} object={new THREE.Mesh(item, material)}/>
              ))}
              <primitive object={new THREE.Mesh(logoText, outBoxMaterial)}/>
              <MeshLayout threeObject={productShape.shapes} material={shapeMaterial}/>
              {productShape.outBox && <MeshLayout threeObject={productShape.outBox} material={outBoxMaterial}/>}
              {productShape.verges && <MeshLayout threeObject={productShape.verges} material={vergesMaterial}/>}
              {productShape.sizes && <MeshLayout threeObject={productShape.sizes} material={sizesMaterial}/>}
            </>
          }
        </mesh>
      </Canvas>
    </div>
  )
})
