import  { useEffect, useState } from 'react'
import  "./drinkUpdate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { DrinkInterface } from '../../../../../interface/IDrink';
import { GetDrinkById, UpdateDrink } from '../../../../../services/https/food/drink';
import { useNavigate, useParams } from 'react-router-dom';

export default function DrinkUpdate() {
  const navigate = useNavigate();
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
        navigate("/employee/food/drink");
       }, 2000);
     } else {
       messageApi.open({
         type: "error",
         content: res.message,
       });
     }
   };
 
   const getDrinkById = async () => {
     let res = await GetDrinkById(Number(id));
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
      <div className='drinkUpdate-bg' style={{ background : "#eceef2"}}>
      <h1 className='drinkUpdate-header'>เเก้ไข เครื่องดื่ม</h1>
      <div  className='drinkUpdate-headline'/>
        <div className='drinkUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='drinkUpdate-form-control'>
              <label className='drinkUpdate-text'>ชื่อ</label>
              <br></br>
              <Form.Item name="Name">
                <Input ></Input>
              </Form.Item>
            </div>

            <div className='drinkUpdate-form-control'>
              <label className='drinkUpdate-text'>ราคา</label>
              <br></br>
              <Form.Item name="Count">
                <InputNumber type='number' ></InputNumber>
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
