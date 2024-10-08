import  { useEffect, useState } from 'react'
import  "./dessertUpdate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { DessertInterface } from '../../../../../interface/IDessert';
import { GetDessertById, UpdateDessert } from '../../../../../services/https/food/dessert';
import { useNavigate, useParams } from 'react-router-dom';

export default function DessertUpdate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [dessert, setDessert] = useState<DessertInterface>();

   // รับข้อมูลจาก params
   let { id } = useParams();
   // อ้างอิง form กรอกข้อมูล
   const [form] = Form.useForm();
 
   const onFinish = async (values: DessertInterface) => {
     values.ID = dessert?.ID;
     let res = await UpdateDessert(values);
     if (res.status) {
       messageApi.open({
         type: "success",
         content: "แก้ไขข้อมูลสำเร็จ",
       });
       setTimeout(function () {
        navigate("/employee/food/dessert");
       }, 2000);
     } else {
       messageApi.open({
         type: "error",
         content: res.message,
       });
     }
   };
 
   const getDessertById = async () => {
     let res = await GetDessertById(Number(id));
     if (res) {
      setDessert(res);
       // set form ข้อมูลเริ่มที่เราแก้ไข
       form.setFieldsValue({ 
         Name: res.Name,
         Count: res.Count,
     });
     }
   };
 
   useEffect(() => {
    getDessertById();
   }, []);
  return (
    <>
      {contextHolder}
      <div className='dessertUpdate-bg' style={{ background : "#eceef2"}}>
      <h1 className='dessertUpdate-header'>แก้ไข ของหวาน</h1>
      <div className='dessertUpdate-headline'/>
      

        <div className='dessertUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='dessertUpdate-form-control'>
              <label className='dessertUpdate-text'>ชื่อ</label>
              <br></br>
              <Form.Item name="Name">
                <Input ></Input>
              </Form.Item>
            </div>

            <div className='dessertUpdate-form-control'>
              <label className='dessertUpdate-text'>ราคา</label>
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
