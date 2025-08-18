import { RouterProvider, createHashRouter } from 'react-router-dom'
import Scenes from '@components/Scenes'
import BulbProvider from '@context/BulbContext'
import Devices from '@components/Devices'
import WizController from '@views/WizController'

const router = createHashRouter([
  {
    path: '/',
    element: <WizController />
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
