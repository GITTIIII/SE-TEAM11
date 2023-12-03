import NavbarTourist from "../tourist_manu/tourist_menu"
import "./navbar.css"
import logo1 from "../../asset/logo1.png"
import userProfile from "../../asset/no_profile.png"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
        <div className="navbar">
            <img src={logo1} alt="logo" className="logo"/>
            <div className="navbar-tourist">
              <NavbarTourist/>
            </div>
            <Link to="profile">
              <img src={userProfile} alt="userProfile" className="profile"/>
            </Link>
        </div>
  )
}
