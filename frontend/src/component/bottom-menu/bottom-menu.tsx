import { NavLink } from "react-router-dom";
import './bottom-menu.css'
function BottomMenu() {
  return (
    <>
      <div className="Bottom-menu">
        <ul>
          <NavLink to="employeeProfile">
            <li>โปรไฟล์</li>
          </NavLink>
          <NavLink to="/login/employee">
            <li>ออกจากระบบ</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default BottomMenu;