import React, { useEffect, useState } from 'react'
import logo1 from "../../asset/logo1.png"
import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCreditCard, faMapLocationDot, faPaperPlane, faPersonWalking, faScrewdriverWrench, faUserCheck, faUserGear,  faUtensils } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { GetEmployeeById } from '../../services/https/employee'

export default function Sidebar() {
  const [employee, setEmployee] = useState(null);
  const EmployeeID = localStorage.getItem("EmployeeID")
  console.log(EmployeeID)

  useEffect(() => {
    const fetchData = async () => {
      setEmployee(await GetEmployeeById(Number(EmployeeID)));
    };
    fetchData();
  }, []);

  return (
    <div className="sidebar">
        <div className="logo"><img src={logo1} alt="logo" /></div>
        <div className="menu">
            <ul>

                <NavLink to="admin">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faUserGear} size='lg'/>
                    <label>Employee</label>
                  </li>
                </NavLink>

                <NavLink to="payment">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faCreditCard} size='lg'/>
                    <label>Payment</label>
                  </li>
                </NavLink>

                <NavLink to="check-in">
                <li>
                  <FontAwesomeIcon className='icon' icon={faUserCheck} size='lg'/>
                  <label>Check in</label>
                </li>              
                </NavLink>

                <NavLink to="destination">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faMapLocationDot} size='lg'/>
                    <label>Destination</label>
                  </li>              
                </NavLink>

                <NavLink to="activity">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faPersonWalking} size='lg'/>
                    <label>Activity</label>
                  </li>              
                </NavLink>

                <NavLink to="food">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faUtensils} size='lg'/>
                    <label>Food</label>
                  </li>              
                </NavLink>

                <NavLink to="planner">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faPaperPlane} size='lg'/>
                    <label>Planner</label>
                  </li>              
                </NavLink>

                <NavLink to="repair">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faScrewdriverWrench} size='lg'/>
                    <label>Repair</label>
                  </li>
                </NavLink>

                <NavLink to="room">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faBed} size='lg'/>
                    <label>Room</label>
                  </li>
                </NavLink>
            </ul>
        </div>
        <div className="user">
            {Object(employee).Name}
        </div>
    </div>
  )
}
