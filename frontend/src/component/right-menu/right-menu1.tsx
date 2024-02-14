import { NavLink } from "react-router-dom";
import './right-menu.css'
import { useEffect, useState } from "react";
import { TouristInterface } from "../../interface/ITourist";
import { GetTouristById } from "../../services/https/tourist";
import userProfile from "../../asset/no_profile.png"

function RightMenu1() {
  const [tourist, setTourist] = useState<TouristInterface[]>([]);
  const TouristID = localStorage.getItem("TouristID")

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("TouristID");
  }


  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
    };
    fetchData();

  }, []);
  
  console.log(tourist);
  return (
    <>
      <div className="right-menu">
        <div className="tourist-info">
          <img src={Object(tourist)?.Picture === "" ? userProfile : Object(tourist)?.Picture} alt="userProfile" className="profile"/>
          {Object(tourist).Tourist_name}
        </div>
        <ul>
          <NavLink to="touristProfile">
            <li>โปรไฟล์</li>
          </NavLink>
          <NavLink to="bookPlan">
            <li>จอง</li>
          </NavLink>
          <NavLink to="food">
            <li>อาหาร</li>
          </NavLink>
          <NavLink to="showPlanner">
            <li>ทริป</li>
          </NavLink>
          <NavLink to="showRoom">
            <li>ห้อง</li>
          </NavLink>
          <NavLink to="bookActivity">
            <li>กิจกรรม</li>
          </NavLink>
          <NavLink to="payment">
            <li>ชำระเงิน</li>
          </NavLink>
          <NavLink to="/" onClick={Logout}>
            <li>ออกจากระบบ</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default RightMenu1;