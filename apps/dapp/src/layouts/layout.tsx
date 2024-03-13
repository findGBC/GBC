import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import category from '../assets/img/nav/category.svg'
import glass from '../assets/img/nav/liner_glass.svg'
import CCprojet from '../assets/img/nav/project.svg'
import ressources from '../assets/img/nav/ressources.svg'
import shop from '../assets/img/nav/shop.svg'
import trading from '../assets/img/nav/trading.svg'
import { NavBar, Sidebar } from '../components/organism'
import '../styles/app.css'
import { NavigationCaterogy } from '../global/enum'
import type { NavigationItem } from '../global/type'

const navigation: NavigationItem[] = [
  {
    category: NavigationCaterogy.Home,
    href: '/',
    name: 'Home',
    url: category,
  },
  {
    category: NavigationCaterogy.Project,
    href: '/lab',
    name: 'Blueberry Lab',
    url: glass,
  },
  {
    category: NavigationCaterogy.Project,
    href: '',
    name: 'Shop',
    url: shop,
  },
  {
    category: NavigationCaterogy.Project,
    href: '/trading',
    name: 'GBC Trading',
    url: trading,
  },
  {
    category: NavigationCaterogy.Project,
    href: '',
    name: 'CC Project',
    url: CCprojet,
  },
  {
    category: NavigationCaterogy.Project,
    href: '/ressources',
    hrefs: [
      {
        name: 'Education Hub (Coming Soon)',
        url: ressources,
      },
      {
        href: 'https://docs.findgbc.com/blueberry-club/introduction-about',
        name: 'Documentation',
        url: ressources,
      },
      {
        href: 'https://www.findgbc.com/blog',
        name: 'Blog',
        url: ressources,
      },
    ],
    name: 'Ressources',
    url: ressources,
  },
]

const LayoutMain = () => {
  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <div className="flex mt-24">
        <div className="md:w-2/12">
          <Sidebar navigation={navigation} />
        </div>
        <main className="md:w-10/12">
          <Outlet />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  )
}

export default LayoutMain
