import {NavLink} from "react-router-dom";
import "./tourist_menu.css"

export default function NavbarTourist() {
    return (
        <>
            <div className='tourist-menu'>
                <ul>
                    <li className='tourist-manu-1'><NavLink to="bookPlan">จอง</NavLink></li>
                    <li className='tourist-manu-2'><NavLink to="food">อาหาร</NavLink></li>
                    <li className='tourist-manu-3'><NavLink to="destination">จุดหมาย</NavLink></li>
                    <li className='tourist-manu-4'><NavLink to="showRoom">ห้อง</NavLink></li>
                    <li className='tourist-manu-5'><NavLink to="bookActivity">จองกิจกรรม</NavLink></li>
                    <li className='tourist-manu-6'><NavLink to="payment">ชำระเงิน</NavLink></li>
                </ul>
            </div>
        </>      
  )
}