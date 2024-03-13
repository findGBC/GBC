import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import LayoutMain from '../../layouts/layout'

const Homepage = lazy(() => import('../../pages/Homepage/Homepage'))
const LaunchApp = lazy(() => import('../../pages/LaunchApp/LaunchApp'))
const BlueberryLab = lazy(() => import('../../pages/BlueberryLab/BlueberryLab'))
const GbcTrading = lazy(() => import('../../pages/GbcTrading/GbcTrading'))
const Profile = lazy(() => import('../../pages/Profile/Profile'))
const GbcShop = lazy(() => import('../../pages/Shop/GbcShop'))

const GbcRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Homepage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/launchApp" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <LaunchApp />
            </Suspense>
          }
        />
      </Route>
      <Route path="/lab" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <BlueberryLab />
            </Suspense>
          }
        />
      </Route>
      <Route path="/profile" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Profile />
            </Suspense>
          }
        />
      </Route>
      <Route path="/trading" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <GbcTrading />
            </Suspense>
          }
        />
      </Route>
      <Route path="/shop" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <GbcShop />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<LayoutMain />}>
        <Route
          element={
            <Suspense fallback={null}>
              <div>404 not found</div>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default GbcRoutes
