import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { NavBar } from '../components/organism'
import '../styles/app.css'
import Footer from '../components/organism/Footer/Footer'
import { TreasuryDataProvider } from '../providers/TreasuryDataProvider'

const LayoutMain = (): JSX.Element => {
  return (
    <TreasuryDataProvider>
      <NavBar></NavBar>
      <main className="mt-1">
        <Outlet />
      </main>
      <Footer></Footer>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </TreasuryDataProvider>
  )
}

export default LayoutMain
