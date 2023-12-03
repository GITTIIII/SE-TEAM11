import { useEffect, useState } from 'react'
import { GetTouristById } from '../../../services/https/tourist';

export default function Profile() {
  const [tourist, setTourist] = useState(null);
  const TouristID = localStorage.getItem("TouristID")
  console.log(TouristID)

  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
      console.log(tourist)
    };
    fetchData();
  }, [TouristID, tourist]);

  return (
    <div>{Object(tourist).Tourist_name}</div>
  )
}
