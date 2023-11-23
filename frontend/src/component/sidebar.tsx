import React from 'react'
import logo1 from "../asset/logo1.png"
import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCreditCard, faMapLocationDot, faPaperPlane, faScrewdriverWrench, faUserCheck, faUserGear,  faUtensils } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="logo"><img src={logo1} alt="logo" /></div>
        <div className="menu">
            <ul>

                <Link to="admin">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faUserGear} size='lg'/>
                    <label>Employee</label>
                  </li>
                </Link>

                <Link to="payment">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faCreditCard} size='lg'/>
                    <label>Payment</label>
                  </li>
                </Link>

                <Link to="check-in">
                <li>
                  <FontAwesomeIcon className='icon' icon={faUserCheck} size='lg'/>
                  <label>Check in</label>
                </li>              
                </Link>

                <Link to="destination">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faMapLocationDot} size='lg'/>
                    <label>Destination</label>
                  </li>               
                </Link>

                <Link to="food">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faUtensils} size='lg'/>
                    <label>Food</label>
                  </li>               
                </Link>

                <Link to="planner">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faPaperPlane} size='lg'/>
                    <label>Planner</label>
                  </li>               
                </Link>

                <Link to="repair">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faScrewdriverWrench} size='lg'/>
                    <label>Repair</label>
                  </li>
                </Link>

                <Link to="room">
                  <li>
                    <FontAwesomeIcon className='icon' icon={faBed} size='lg'/>
                    <label>Room</label>
                  </li>
                </Link>
            </ul>
        </div>
        <div className="user">
            Employee: name
        </div>
    </div>
  )
}
