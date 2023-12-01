import {NavLink} from "react-router-dom";
import "./tourist_menu.css"

export default function NavbarTourist() {
    return (
        <>
            <div className='tourist-menu'>
                <ul>
                    <li className='tourist-manu-1'><NavLink to="bookPlan">จอง</NavLink></li>
                    <li className='tourist-manu-2'><NavLink to="bookPlan">จอง</NavLink></li>
                    <li className='tourist-manu-3'><NavLink to="bookPlan">จอง</NavLink></li>
                    <li className='tourist-manu-4'><NavLink to="bookPlan">จอง</NavLink></li>
                    <li className='tourist-manu-5'><NavLink to="bookPlan">จอง</NavLink></li>
                </ul>
            </div>
        </>      
  )
}