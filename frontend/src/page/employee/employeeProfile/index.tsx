import { useEffect, useState } from 'react'
import { GetEmployeeById } from '../../../services/https/employee';
import ship from "../../../asset/ship.jpg"
import "../../tourist/touristProfile/touristProfile.css"
import { EmployeeInterface } from '../../../interface/IEmployee';

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  const EmployeeID = localStorage.getItem("EmployeeID")
  console.log(EmployeeID);

  useEffect(() => {
    const fetchData = async () => {
      setEmployee(await GetEmployeeById(Number(EmployeeID)));
    };
    fetchData();
  }, []);
  console.log(employee);
  return (
    <>
    
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        <div className="profile-box">
          <div>{Object(employee).Name}</div>
          <div>{Object(employee).Email}</div>
          <div>{Object(employee)?.Gender?.Name}</div>
          <div>{Object(employee).Tel}</div>
        </div>
      </div>
    </>
  )
}
