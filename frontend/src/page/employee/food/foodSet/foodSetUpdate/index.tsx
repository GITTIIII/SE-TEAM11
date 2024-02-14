import { useEffect, useState } from 'react'
import  "./foodSetUpdate.css"
import {  Form, message,  Input, InputNumber, Select, } from 'antd';
import cruise from "../../../../../asset/cruise.png";
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
  const navigate = useNavigate();
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
           navigate("/employee/food");
         }, 2000);
       } else {
         messageApi.open({
           type: "error",
           content: res.message,
         });
       }
     };
   
     const getFoodSetById = async () => {
       let res = await GetFoodSetById(Number(id));
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
      <div className='cruise-bg' style={{ background : "#eceef2"}}>
      <h1 className='foodSetUpdate-header'>แก้ไข ชุดอาหาร</h1>
      <div className="foodSetUpdate-headline" />
        <div className='foodSetUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='foodSetUpdate-form-control'>
              <Form.Item name="Name" label="ชื่อ">
                <Input></Input>
              </Form.Item>
            </div>
            <div className='foodSetUpdate-form-control'>
              <Form.Item name="savoryID" label="ของคาว" >
                <Select allowClear>
                  {savorys.map((item) => (
                    <Option value={item.ID} key={item.Name}>{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="DrinkID" label="เครื่องดื่ม">
                <Select allowClear>
                  {drinks.map((item) => (
                    <Option value={item.ID} key={item.Name} >{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="DessertID" label="ของหวาน" >
                <Select allowClear >
                  {desserts.map((item) => (
                    <Option value={item.ID} key={item.Name} >{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="Count" label="ราคา">
                <InputNumber type='number'></InputNumber>
              </Form.Item>
            </div>

            <br></br>
            <div className='buttom-area'>
              <button  type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>     
      </div>
    </>
  )
}
export default FoodSetUpdate;
