import NavbarTourist from "../tourist_manu/tourist_menu"
import "./navbar.css"
import logo1 from "../../asset/logo1.png"
import userProfile from "../../asset/no_profile.png"

export default function Navbar() {
  return (
        <div className="navbar">
            <img src={logo1} alt="logo" className="logo"/>
            <div className="navbar-tourist">
              <NavbarTourist/>
            </div>
            <img src={userProfile} alt="userProfile" className="profile"/>
        </div>
  )
}
