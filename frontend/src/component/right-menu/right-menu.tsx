import { NavLink } from "react-router-dom";
import './right-menu.css'
function RightMenu() {
  return (
    <>
      <div className="right-menu">
        <ul>
          <NavLink to="profile">
            <li>โปรไฟล์</li>
          </NavLink>
          <NavLink to="/">
            <li>ออกจากระบบ</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default RightMenu;