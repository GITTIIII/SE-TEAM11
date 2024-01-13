import { useEffect, useState } from 'react'
import  "./foodSetUpdate.css"
import {  Form, message,  Input, InputNumber, Select, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { FoodSetInterface } from '../../../../../interface/IFoodSet';
import { DessertInterface } from '../../../../../interface/IDessert';
import { SavoryInterface } from '../../../../../interface/ISavory';
import { DrinkInterface } from '../../../../../interface/IDrink';

import {  GetFoodSetById, UpdateFoodSet } from '../../../../../services/https/food/foodSet';
import { GetAllDessert } from '../../../../../services/https/food/dessert';
import { GetAllSavory } from '../../../../../services/https/food/savory';
import { GetAllDrink } from '../../../../../services/https/food/drink';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

function FoodSetUpdate() {
  // const navigate = useNavigate();
  const [desserts, setDessert] = useState<DessertInterface[]>([]);
  const [savorys, setSavory] = useState<SavoryInterface[]>([]);
  const [drinks, setDrink] = useState<DrinkInterface[]>([]);
  const [foodSet, setFoodSet] = useState<FoodSetInterface>();
  const [messageApi, contextHolder] = message.useMessage();

     // รับข้อมูลจาก params
     let { id } = useParams();
     // อ้างอิง form กรอกข้อมูล
     const [form] = Form.useForm();
   
     const onFinish = async (values: FoodSetInterface) => {
       values.ID = foodSet?.ID;
       let res = await UpdateFoodSet(values);
       if (res.status) {
         messageApi.open({
           type: "success",
           content: "แก้ไขข้อมูลสำเร็จ",
         });
         setTimeout(function () {
          //  navigate("/customer");
         }, 2000);
       } else {
         messageApi.open({
           type: "error",
           content: "แก้ไขข้อมูลไม่สำเร็จ",
         });
       }
     };
   
     const getFoodSetById = async () => {
       let res = await GetFoodSetById(Number(2));
       if (res) {
        setFoodSet(res);
         // set form ข้อมูลเริ่มที่เราแก้ไข
         form.setFieldsValue({ 
           Name: res.Name,
           savoryID: res.SavoryID,
           DrinkID: res.DrinkID,
           DessertID: res.DessertID,
           Count: res.Count,

       });
       }
     };
   
     useEffect(() => {
      getFoodSetById();
     }, []);
  const getDessert = async () => {
    let res = await GetAllDessert();
    if (res) {
      setDessert(res);
    }
  };
useEffect(() => {
    getDessert();
  }, []);

  const getSavory = async () => {
    let res = await GetAllSavory();
    if (res) {
      setSavory(res);
    }
  };
useEffect(() => {
    getSavory();
  }, []);

  const getDrink = async () => {
    let res = await GetAllDrink();
    if (res) {
      setDrink(res);
    }
  };
useEffect(() => {
    getDrink();
  }, []);


  return (
    <>
      {contextHolder}
      <div className='foodSetUpdate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='foodSetUpdate-header'>foodSet</h1>
        <div className='foodSetUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='foodSetUpdate-form-control'>
              <label className='foodSetUpdate-text'>Name</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name' ></Input>
              </Form.Item>
            </div>
            <div className='foodSetUpdate-form-control'>
              <Form.Item name="savoryID" label="savory" >
                <Select allowClear>
                  {savorys.map((item) => (
                    <Option value={item.ID} key={item.Name}>{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="DrinkID" label="drink" >
                <Select allowClear>
                  {drinks.map((item) => (
                    <Option value={item.ID} key={item.Name} >{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="DessertID" label="dessert" >
                <Select allowClear >
                  {desserts.map((item) => (
                    <Option value={item.ID} key={item.Name} >{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <label className='foodSetUpdate-text'>Count</label>
              <br></br>
              <Form.Item name="Count">
                <InputNumber placeholder='Count' type='number'></InputNumber>
              </Form.Item>
            </div>

            <br></br>
            <div className='buttom-area'>
              <button  type="submit">Submit</button>
            </div>
          </Form>
        </div>     
      </div>
    </>
  )
}
export default FoodSetUpdate;
