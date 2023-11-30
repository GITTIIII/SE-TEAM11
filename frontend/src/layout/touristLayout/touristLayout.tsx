import { Outlet } from 'react-router-dom'
import Navbar from '../../component/navbar/navbar'
export default function TouristLayout() {

  return (
    <>
        <main>
          <div className="touristlayout">
            <Navbar/>
            <Outlet/>
          </div>
        </main>
        {/* <footer>
            <Footer/>
        </footer> */}
    </>
  )
}