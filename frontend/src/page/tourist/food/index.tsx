import ship1 from "../../../asset/ship1.jpg"
import { useEffect, useState, createContext } from "react"

import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { message } from "antd"

import "./food.css"
import { PlannerInterface } from "../../../interface/IPlanner";
import { GetAllPlanner } from "../../../services/https/planner";
import { FoodSetInterface } from "../../../interface/IFoodSet";
import { GetAllFoodSet } from "../../../services/https/food/foodSet";
import { SavoryInterface } from "../../../interface/ISavory";
import { DessertInterface } from "../../../interface/IDessert";
import { GetAllSavory } from "../../../services/https/food/savory";
import { GetAllDessert } from "../../../services/https/food/dessert";
import { GetAllDrink } from "../../../services/https/food/drink";
export const idFood = createContext(0);




export default function Food() {
  const [messageApi, contextHolder] = message.useMessage();
  const [FoodID, setFoodID] = useState(0);
  const TouristID = localStorage.getItem("TouristID");
  const [showReviewClick, setShowReviewClick] = useState(false);

  const [Savory, setSavory] = useState<SavoryInterface[]>([])
  const [Dessert, setDessert] = useState<DessertInterface[]>([])
  const [Drink, setDrink] = useState<DessertInterface[]>([])


  async function GetSavory() {
    setSavory(await GetAllSavory())
  }
  useEffect(() => {
    GetSavory()
  }, [])

  async function GetDessert() {
    setDessert(await GetAllDessert())
  }
  useEffect(() => {
    GetDessert()
  }, [])

  async function GetDrink() {
    setDrink(await GetAllDrink())
  }
  useEffect(() => {
    GetDrink()
  }, [])

  const handleCancel = () => {
    setShowReviewClick(!showReviewClick);
  
}



    

    return(
      <>
        <idFood.Provider value={FoodID}>
            <div className="login-bg" style={{ backgroundImage: `url(${ship1})` }}>
                <div className="food-list-box">
                    <div className="food-list-box-top">
                        <h1>ของคาว</h1>
                    </div>
                    <div className="card">
              {Savory.map((item, index) => (
                  <div key={index} className="information">
                    <div><label>ชื่ออาหาร :</label> {item.Name}</div>
                    <div><label>ราคา :</label> {item.Count}</div>
                  </div>
              ))}
            </div>
            <div className="food-list-box-top">
                        <h1>ของหวาน</h1>
                    </div>
            <div className="card">
              {Dessert.map((item, index) => (
                  <div key={index} className="information">
                    <div><label>ชื่ออาหาร :</label> {item.Name}</div>
                    <div><label>ราคา :</label> {item.Count}</div>
                  </div>
              ))}
            </div>
            <div className="food-list-box-top">
                        <h1>เครื่องดื่ม</h1>
                    </div>
            <div className="card">
              {Drink.map((item, index) => (
                  <div key={index} className="information">

                    <div><label>ชื่ออาหาร :</label> {item.Name}</div>
                    <div><label>ราคา :</label> {item.Count}</div>
                  </div>
              ))}
            </div>
                </div>
            </div>
        </idFood.Provider>
      </> 
    )
}