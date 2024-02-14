import { NavLink } from "react-router-dom";
import './bottom-menu.css'
function BottomMenu() {
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("EmployeeID");
  }

  return (
    <>
      <div className="Bottom-menu">
        <ul>
          <NavLink to="employeeProfile">
            <li>โปรไฟล์</li>
          </NavLink>
          <NavLink to="/login/employee" onClick={Logout}>
            <li>ออกจากระบบ</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default BottomMenu;