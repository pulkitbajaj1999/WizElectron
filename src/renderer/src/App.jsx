import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import BulbProvider from '@context/BulbProvider'
import ControllerLayout from '@layout/ControllerLayout'
import MainLayout from '@layout/MainLayout'
import Connect from '@views/Connect'
import StaticScenes from '@views/StaticScenes'
import Dynamic from '@views/Dynamic'
import ColorScenes from '@views/ColorScenes'
import DeviceInfo from '@views/DeviceInfo'

import NotFound from '@views/NotFound'

const App = () => {
  return (
    <BulbProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="connect" replace />} />
            <Route path="connect" element={<Connect />} />
            <Route path="controller" element={<ControllerLayout />}>
              {/* Redirect root to /dashboard */}
              <Route index element={<Navigate to="static" replace />} />
              <Route path="static" element={<StaticScenes />} />
              <Route path="dynamic" element={<Dynamic />} />
              <Route path="color" element={<ColorScenes />} />
            </Route>
            <Route path="device-info" element={<DeviceInfo />} />
          </Route>
          {/* Add NotFound fallback if desired */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </BulbProvider>
  )
}

export default App
