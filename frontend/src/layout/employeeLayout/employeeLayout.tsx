import { Outlet } from 'react-router-dom'
import Sidebar from '../../component/sidebar/sidebar'
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