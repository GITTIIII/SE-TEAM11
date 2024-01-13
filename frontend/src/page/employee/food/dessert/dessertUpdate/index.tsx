import  { useEffect, useState } from 'react'
import  "./dessertUpdate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { DessertInterface } from '../../../../../interface/IDessert';
import { GetDessertById, UpdateDessert } from '../../../../../services/https/food/dessert';
import { useParams } from 'react-router-dom';

export default function DessertUpdate() {
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
        //  navigate("/customer");
       }, 2000);
     } else {
       messageApi.open({
         type: "error",
         content: "แก้ไขข้อมูลไม่สำเร็จ",
       });
     }
   };
 
   const getDessertById = async () => {
     let res = await GetDessertById(Number(2));
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
      <div className='dessertUpdate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='dessertUpdate-header'>dessert</h1>
        <div className='dessertUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='dessertUpdate-form-control'>
              <label className='dessertUpdate-text'>dessert</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='dessertUpdate-form-control'>
              <label className='dessertUpdate-text'>Count</label>
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
