import { useEffect, useState } from 'react'
import { GetTouristById } from '../../../services/https/tourist';
import { TouristInterface } from '../../../interface/ITourist';
import { Form } from "antd"
import { useNavigate } from 'react-router-dom';
import ship from "../../../asset/ship.jpg"
import userProfile from "../../../asset/no_profile.png"

export default function TouristProfile() {
  const [tourist, setTourist] = useState<TouristInterface>();
  const TouristID = localStorage.getItem("TouristID")
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
      console.log(tourist)
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="profile-bg"  style={{ backgroundImage: `url(${ship})`}}>
      <div className="profile-box">
        <h1>โปรไฟล์</h1>
        <Form>
          <div className="profile-picture">
            <img src={Object(tourist).Picture === "" ? userProfile : Object(tourist).Picture} alt="userProfile" className="profile"/>
          </div>
          <div className="update-infomation">
            <div className="profile-input">
                <label>ชื่อ</label>
                {Object(tourist).Tourist_name}  
            </div>

            <div className="profile-input">
                <label>อีเมล</label>
                {Object(tourist).Email}
            </div>

            <div className="profile-input">
                <label>เพศ</label>
                {Object(tourist).Gender} 
            </div>

            <div className="profile-input">
                <label>เบอร์โทร</label>
                {Object(tourist).Phone}
            </div>

            <div className="profile-input">
                <label>อายุ</label>
                {Object(tourist).Age}
            </div>
            <div className="profile-button">
              <button className='activity-button' onClick={() => navigate("/tourist/editProfile")}>
                เเก้ไขโปรไฟล์
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    </>
  )
}
