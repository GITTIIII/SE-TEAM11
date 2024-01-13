import  { useEffect, useState } from 'react'
import  "./drinkUpdate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { DrinkInterface } from '../../../../../interface/IDrink';
import { GetDrinkById, UpdateDrink } from '../../../../../services/https/food/drink';
import { useParams } from 'react-router-dom';

export default function DrinkUpdate() {
  const [messageApi, contextHolder] = message.useMessage();
  const [drink, setDrink] = useState<DrinkInterface>();

   // รับข้อมูลจาก params
   let { id } = useParams();
   // อ้างอิง form กรอกข้อมูล
   const [form] = Form.useForm();
 
   const onFinish = async (values: DrinkInterface) => {
     values.ID = drink?.ID;
     let res = await UpdateDrink(values);
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
 
   const getDrinkById = async () => {
     let res = await GetDrinkById(Number(2));
     if (res) {
      setDrink(res);
       // set form ข้อมูลเริ่มที่เราแก้ไข
       form.setFieldsValue({ 
         Name: res.Name,
         Count: res.Count,
     });
     }
   };
 
   useEffect(() => {
    getDrinkById();
   }, []);
  return (
    <>
      {contextHolder}
      <div className='drinkUpdate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='drinkUpdate-header'>drink</h1>
        <div className='drinkUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='drinkUpdate-form-control'>
              <label className='drinkUpdate-text'>drink</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='drinkUpdate-form-control'>
              <label className='drinkUpdate-text'>Count</label>
              <br></br>
              <Form.Item name="Count">
                <InputNumber type='number' placeholder='Count'></InputNumber>
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
