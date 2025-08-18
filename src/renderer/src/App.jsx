import { RouterProvider, createHashRouter } from 'react-router-dom'
import Home from '@components/Home'
import Scenes from '@components/Scenes'
import BulbProvider from '@context/BulbContext'
import Devices from '@components/Devices'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/scenes',
    element: <Scenes />
  },
  {
    path: '/devices',
    element: <Devices />
  }
])

export default function App() {
  return (
    <BulbProvider>
      <RouterProvider router={router} />
    </BulbProvider>
  )
}
