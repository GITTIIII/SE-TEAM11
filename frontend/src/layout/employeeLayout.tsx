import { Outlet } from 'react-router-dom'
// import Footer from '../component/footer/footer'
import Sidebar from '../component/sidebar'
import "./layout.css"
export default function EmployeeLayout() {

  return (
    <>
        <main>
          <div className="employeelayout">
            <Sidebar/>
            <Outlet/>
          </div>
        </main>
        {/* <footer>
            <Footer/>
        </footer> */}
    </>
  )
}