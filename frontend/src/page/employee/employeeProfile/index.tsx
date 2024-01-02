import { useEffect, useState } from 'react'
import { GetEmployeeById } from '../../../services/https/employee';
import ship from "../../../asset/ship.jpg"
import "./profile.css"

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const EmployeeID = localStorage.getItem("EmployeeID")
  console.log(employee)

  useEffect(() => {
    const fetchData = async () => {
      setEmployee(await GetEmployeeById(Number(EmployeeID)));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        <div className="profile-box">
          <div>{Object(employee).Name}</div>
          <div>{Object(employee).Email}</div>
          <div>{Object(employee).Gender}</div>
          <div>{Object(employee).Tel}</div>
        </div>
      </div>
    </>
  )
}
