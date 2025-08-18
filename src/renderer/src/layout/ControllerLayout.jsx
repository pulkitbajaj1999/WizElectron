import { Box } from '@mui/material'
import TopBar from '@components/TopBar'
import BottomTabs from '@components/BottomTabs'
import { Outlet } from 'react-router-dom'

import BrightnessControl from '@components/BrightnessControl'

export default function ControllerLayout() {
  return (
    <Box
      className="controller-layout__wrapper"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <TopBar />
      <Box className="controller-layout__main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Outlet />
      </Box>
      <BrightnessControl />
      <BottomTabs />
    </Box>
  )
}
