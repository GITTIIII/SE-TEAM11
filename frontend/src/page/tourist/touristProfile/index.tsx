import { useEffect, useState } from 'react'
import { GetTouristById } from '../../../services/https/tourist';
import ship from "../../../asset/ship.jpg"
export default function TouristProfile() {
  const [tourist, setTourist] = useState(null);
  const TouristID = localStorage.getItem("TouristID")
  console.log(tourist)

  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
      console.log(tourist)
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="login-bg"  style={{ backgroundImage: `url(${ship})`}}>
      <div className="profile-box">
        <div>{Object(tourist).Tourist_name}</div>
        <div>{Object(tourist).Email}</div>
        <div>{Object(tourist).Gender}</div>
        <div>{Object(tourist).Phone}</div>
      </div>
    </div>
    </>
  )
}
