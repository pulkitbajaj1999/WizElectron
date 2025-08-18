import { useState } from 'react'
import { Box } from '@mui/material'
import TopBar from '@components/TopBar'
import BottomTabs from '@components/BottomTabs'

import BrightnessControl from '@components/BrightnessControl'

export default function MainLayout({ isOn, onToggle, tab, onTabChange, children }) {
  const [brightness, setBrightness] = useState(100)
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar isOn={isOn} onToggle={onToggle} />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
      <BrightnessControl brightness={brightness} onChange={(_, val) => setBrightness(val)} />
      <BottomTabs value={tab} onChange={onTabChange} />
    </Box>
  )
}
