// components/MainLayout.tsx

import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Sidebar from '@components/Sidebar'

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      {/* Main Content */}
      <Box
        className="main-layout__content"
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          height: '100vh'
          // minHeight: '100vh'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
