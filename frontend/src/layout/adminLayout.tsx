import React from 'react'
import { Outlet } from 'react-router-dom'
// import Footer from '../component/footer/footer'
import Sidebar from '../component/sidebar'

export default function AdminLayout() {

  return (
    <>
        <Sidebar/>
        <main>
            <Outlet/>
        </main>
        {/* <footer>
            <Footer/>
        </footer> */}
    </>
  )
}