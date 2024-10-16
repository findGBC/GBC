import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import LayoutMain from '../../layouts/layout'

const Homepage = lazy(() => import('../../pages/Homepage/Homepage'))
const Ecosystem = lazy(() => import('../../pages/Ecosystem/Ecosystem'))
const Treasury = lazy(() => import('../../pages/Treasury/Treasury'))
const Blog = lazy(() => import('../../pages/Blog/Blog'))
const BlogPost = lazy(() => import('../../pages/Blog/BlogPost'))

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
      <Route path="/ecosystem" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Ecosystem />
            </Suspense>
          }
        />
      </Route>
      <Route path="/treasury" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Treasury />
            </Suspense>
          }
        />
      </Route>
      <Route path="/blog" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Blog />
            </Suspense>
          }
        />
      </Route>
      <Route path="/blog/:slug" element={<LayoutMain />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <BlogPost />
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
