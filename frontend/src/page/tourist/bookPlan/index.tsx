import { useEffect, useState, createContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./bookPlan.css"
import { message, Card } from 'antd';
import ship1 from "../../../asset/ship1.jpg"
import { PlannerInterface } from '../../../interface/IPlanner';
import { RoomInterface } from '../../../interface/IRoom';
import { FoodSetInterface } from '../../../interface/IFoodSet';
import { GetTouristById } from '../../../services/https/tourist';
import { GetAllPlanner } from '../../../services/https/planner';
import { ListRoom } from '../../../services/https/room';
import { GetAllFoodSet } from '../../../services/https/food/foodSet';
import "swiper/css";
import 'swiper/css/scrollbar';
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Meta } = Card;

export const idBookPlan = createContext(0);

export default function BookPlan() {
  const [tourist, setTourist] = useState(null);
  const [bookPlanID, setBookPlanID] = useState(0);
  const TouristID = Number(localStorage.getItem("TouristID"))
  console.log(tourist)

  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
      console.log(tourist)
    };
    fetchData();
  }, []);

  const [planner, setPlanner] = useState<PlannerInterface[]>([])
  async function GetPlanner() {
    setPlanner(await GetAllPlanner())
  }

  const [room, setRoom] = useState<RoomInterface[]>([])
  async function GetRoom() {
    setRoom(await ListRoom())
  }

  const [foodSet, setFoodSet] = useState<FoodSetInterface[]>([])
  async function GetFoodSet() {
    setFoodSet(await GetAllFoodSet())
  }

  useEffect(() => {
    GetPlanner()
    GetRoom()
    GetFoodSet()
  }, [])

  return (
    <idBookPlan.Provider value={bookPlanID}>
      <div className="bookPlan-bg" style={{ backgroundImage: `url(${ship1})` }}>
        <div className="bookPlan-list-box">
          <div className="bookPlan-list-box-top">
            <h1>แผนการเดินทาง</h1>
            <Link to="bookPlanCreate">
              <button className="activity-button">
                <FontAwesomeIcon icon={faPlus} className="icon" />
                <label>จองแผนการเดินทาง</label>
              </button>
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'relative', alignItems: 'center' }}>
            {planner.map((item, index) => (
              <Card
                key={index}
                // hoverable
                style={{ width: 350, height: 325, margin: 10 }}
                cover={<img alt="Room Image" src={item.Plan_img} />}
              >
                <Meta title={item.Plan_name} description={`ราคา ${item.Plan_price} บาท`} />
              </Card>
            ))}
          </div>
          <div className="bookPlan-list-box-top">
            <h1>ห้องพัก</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'relative', alignItems: 'center' }}>
            {room.map((item, index) => (
              <Card
                key={index}
                // hoverable
                style={{ width: 350, height: 325, margin: 10 }}
                cover={<img alt="Room Image" src={item.Room_img} />}
              >
                <Meta title={item.Room_number} description={<div>ราคา {item.Room_price} บาท</div>} />
              </Card>
            ))}
          </div>
          <div className="bookPlan-list-box-top">
            <h1>เซ็ตอาหาร</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'relative', alignItems: 'center' }}>
            {foodSet.map((item, index) => (
              <Card
                key={index}
                // hoverable
                style={{ width: 350, height: 325, margin: 10 }}
              // cover={<img alt="Room Image" src={item.Room_img} />}
              >
                <Meta title={item.Name} description={<div>
                  ของคาว {item.Savory?.Name}<br />
                  ของหวาน {item.Dessert?.Name}<br />
                  เครื่องดื่ม {item.Drink?.Name}<br />
                  ราคาทั้งเซ็ต {item.Count} บาท
                </div>} />
              </Card>
            ))}
          </div>

        </div>
      </div>
    </idBookPlan.Provider>
  )
}
