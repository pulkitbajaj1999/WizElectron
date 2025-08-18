import { useState } from 'react'

import ControllerLayout from '@layout/ControllerLayout'
import StaticScenes from './StaticScenes'

import BrightnessControl from '@components/BrightnessControl'
import { Box, Container } from '@mui/material'

export default function WizController() {
  const [isOn, setIsOn] = useState(true)

  const [tab, setTab] = useState(0)

  return (
    <ControllerLayout
      isOn={isOn}
      onToggle={() => setIsOn(!isOn)}
      tab={tab}
      onTabChange={(event, newValue) => setTab(newValue)}
    >
      <StaticScenes />
      {/* <Box sx={{ p: 2, display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        </Box>
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <BrightnessControl brightness={brightness} onChange={(_, val) => setBrightness(val)} />
        </Box>
      </Box> */}
    </ControllerLayout>
  )
}
