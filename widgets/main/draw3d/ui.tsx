import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Control3D } from './control3d'
import { useRenderStore } from 'entities/hooks/useStores'
import { InfoMessage } from './infoMessage'
import { ERenderStatus } from 'entities/stores/render/types'
import { type IProductShape } from './types'

export const Draw3D = observer((): JSX.Element => {
  const [productShape, setProductShape] = useState<IProductShape | null>(null)
  const renderStore = useRenderStore()
  const { model, renderStatus } = renderStore
  useEffect(() => {
    if (model.shapes !== '' && renderStatus === ERenderStatus.Success) {
      const loader = new OBJLoader()
      const shapes = loader.parse(model.shapes)
      const verges = model.verges ? loader.parse(model.verges) : null
      const sizes = model.sizes ? loader.parse(model.sizes) : null
      const outBox = model.outBox ? loader.parse(model.outBox) : null
      const lightType = model.lightType
      setProductShape({
        shapes,
        verges,
        sizes,
        outBox,
        lightType
      })
    } else {
      setProductShape(null)
    }
  }, [model, renderStatus])

  return (
    <>
      { renderStatus !== ERenderStatus.Success && <InfoMessage renderStatus={renderStatus}/> }
      <Control3D productShape={productShape}/>
    </>
  )
})
