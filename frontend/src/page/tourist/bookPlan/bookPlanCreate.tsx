import { useEffect, useState, createContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./bookPlan.css"
import { Form, message, Image, Card } from 'antd';
import ship1 from "../../../asset/ship1.jpg"
import logo1 from "../../../asset/logo1.png"
import { BookPlanInterface } from '../../../interface/IBookPlan';
import { PlannerInterface } from '../../../interface/IPlanner';
import { RoomInterface } from '../../../interface/IRoom';
import { FoodSetInterface } from '../../../interface/IFoodSet';
import { CreateBookPlan } from '../../../services/https/bookPlan';
import { GetTouristById } from '../../../services/https/tourist';
import { GetAllPlanner } from '../../../services/https/planner';
import { ListRoom } from '../../../services/https/room';
import { GetAllFoodSet } from '../../../services/https/food/foodSet';
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Scrollbar } from "swiper/modules";
import "swiper/css";
import 'swiper/css/scrollbar';
import { request } from 'http';
import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Meta } = Card;

export const idBookPlan = createContext(0);

export default function BookPlanCreate() {
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate();
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


    const [input, setInput] = useState({
        PlannerID: 0,
        RoomID: 0,
        FoodSetID: 0,
    });
    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (values: BookPlanInterface) => {
        values.PlannerID = Number(input.PlannerID)
        values.RoomID = Number(input.RoomID)
        values.FoodSetID = Number(input.FoodSetID)
        values.TouristID = TouristID
        console.log(values)

        let res = await CreateBookPlan(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "จองสำเร็จ",
            });
            setTimeout(function () {
                navigate("/tourist/reciept");
            }, 2000);

        } else {
            messageApi.open({
                type: "error",
                content: "เลือกข้อมูลให้ครบถ้วน",
            });
        }


    };
    return (
        <div className="bookPlan-bg" style={{ backgroundImage: `url(${ship1})` }}>
            <div className="bookplan-box">
                {contextHolder}
                <Form onFinish={handleSubmit}>
                    <div className="icon">
                        <img src={logo1} alt="logo" />
                        <div className='cover'>
                            <h2>Booking</h2>
                        </div>
                    </div>

                    <div className="cover">
                        <div className="bookPlan-select-box">
                            <select name="PlannerID" onChange={handleInput} required>
                                <option value="" disabled selected>เลือกแผนการเดินทาง</option>
                                {planner.map((item) => (
                                    <option value={item.ID} key={item.Plan_name}>{item.Plan_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bookPlan-select-box">
                            <select name="RoomID" onChange={handleInput} required>
                                <option value="" disabled selected>เลือกห้องพัก</option>
                                {room.map((item) => (
                                    <option value={item.ID} key={item.Room_number}>{item.Room_number}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bookPlan-select-box">
                            <select name="FoodSetID" onChange={handleInput} required>
                                <option value="" disabled selected>เลือกเซ็ตอาหาร</option>
                                {foodSet.map((item) => (
                                    <option value={item.ID} key={item.Name}>{item.Name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bookPlan-buttom-area">
                            <div className="icon">
                                <button type="submit" >จอง</button>
                            </div>
                        </div>



                    </div>
                </Form>
            </div>
        </div>
    )
}
