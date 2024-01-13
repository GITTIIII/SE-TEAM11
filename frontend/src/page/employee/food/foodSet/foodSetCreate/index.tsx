import { useEffect, useState } from 'react'
import  "./foodSetCreate.css"
import {  Form, message,  Input, InputNumber, Select, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
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
      console.log(res);
      }
    };



  return (
    <>
      {contextHolder}
      <div className='foodSetCreate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='foodSetCreate-header'>foodSet</h1>
        <div className='foodSetCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='foodSetCreate-form-control'>
              <label className='foodSetCreate-text'>Name</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name' ></Input>
              </Form.Item>
            </div>
            <div className='foodSetCreate-form-control'>
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
              <label className='foodSetCreate-text'>Count</label>
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
export default FoodSetCreate;
