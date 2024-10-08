import { useEffect, useState } from 'react'
import  "./foodSetCreate.css"
import {  Form, message,  Input, InputNumber, Select, ConfigProvider, } from 'antd';
import cruise from "../../../../../asset/cruise.png";

import { FoodSetInterface } from '../../../../../interface/IFoodSet';
import { DessertInterface } from '../../../../../interface/IDessert';
import { SavoryInterface } from '../../../../../interface/ISavory';
import { DrinkInterface } from '../../../../../interface/IDrink';

import { CreateFoodSet } from '../../../../../services/https/food/foodSet';
import { GetAllDessert } from '../../../../../services/https/food/dessert';
import { GetAllSavory } from '../../../../../services/https/food/savory';
import { GetAllDrink } from '../../../../../services/https/food/drink';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

function FoodSetCreate() {
  // const navigate = useNavigate();
  const [desserts, setDessert] = useState<DessertInterface[]>([]);
  const [savorys, setSavory] = useState<SavoryInterface[]>([]);
  const [drinks, setDrink] = useState<DrinkInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
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
    const onFinish = async (values: FoodSetInterface) => {
      let res = await CreateFoodSet(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
      } else {
            messageApi.open({
          type: "error",
          content: res.message,
      })
      }
    };



  return (
    <>
      {contextHolder}
      <div className='foodSetCreate-bg' style={{ background : "#eceef2"}}>
      <h1 className='foodSetCreate-header'>เพิ่ม ชุดอาหาร</h1>
      <div className="foodSetCreate-headline" />
        <div className='foodSetCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='foodSetCreate-form-control'>
              <Form.Item name="Name" label="ชื่อ">
                <Input ></Input>
              </Form.Item>
            </div>
            <div className='foodSetCreate-form-control'>
              <Form.Item name="savoryID" label="ของคาว" >
                <Select allowClear>
                  {savorys.map((item) => (
                    <Option value={item.ID} key={item.Name}>{item.Name} ราคา {item.Count} บาท</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="DrinkID" label="เครื่องดื่ม" >
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
                <InputNumber  type='number'></InputNumber>
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
export default FoodSetCreate;
