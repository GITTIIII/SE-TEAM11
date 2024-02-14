import { NavLink } from "react-router-dom";
import './right-menu.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOut, faUserEdit } from "@fortawesome/free-solid-svg-icons";

function RightMenu() {
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("TouristID");
  }
  return (
    <>
      <div className="right-menu">
        <ul>
          <NavLink to="touristProfile">
            <li><FontAwesomeIcon icon={faUserEdit} /> โปรไฟล์</li>
            
          </NavLink>
          <NavLink to="/" onClick={Logout}>
            <li><FontAwesomeIcon icon={faSignOut} /> ออกจากระบบ</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default RightMenu;