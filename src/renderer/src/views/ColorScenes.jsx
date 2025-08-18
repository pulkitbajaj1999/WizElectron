import { Container } from '@mui/material'

import ColorPicker from '@components/ColorPicker'
import TemperatureIntensityPicker from '@components/TemperatureIntensityPicker'
import { useBulb } from '../context/BulbContext'

export default function ColorScenes() {
  let { bulb, localBulbState, apiActions } = useBulb()
  let { color, temp } = localBulbState
  return (
    <Container
      className="color-scenes__container"
      sx={{ py: 2, display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100%', gap: 8 }}
    >
      <ColorPicker color={color} setColor={apiActions.setColor} />
      <TemperatureIntensityPicker
        temp={temp}
        setTemperature={apiActions.setTemperature}
        disabled={!bulb}
      />
    </Container>
  )
}
