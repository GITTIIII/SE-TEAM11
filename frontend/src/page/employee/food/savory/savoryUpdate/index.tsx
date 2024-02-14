import { useEffect, useState } from 'react'
import  "./savoryUpdate.css"
import { Form, message,  Input, InputNumber, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { SavoryInterface } from '../../../../../interface/ISavory';
import { GetSavoryById, UpdateSavory } from '../../../../../services/https/food/savory';
import { useNavigate, useParams } from 'react-router-dom';

export default function SavoryUpdate() {
  const [messageApi, contextHolder] = message.useMessage();
  const [savory, setSavory] = useState<SavoryInterface>();
  const navigate = useNavigate();

   // รับข้อมูลจาก params
   let { id } = useParams();
   // อ้างอิง form กรอกข้อมูล
   const [form] = Form.useForm();
 
   const onFinish = async (values: SavoryInterface) => {
     values.ID = savory?.ID;
     let res = await UpdateSavory(values);
     if (res.status) {
       messageApi.open({
         type: "success",
         content: "แก้ไขข้อมูลสำเร็จ",
       });
       setTimeout(function () {
        navigate("/employee/food/savory");
       }, 2000);
     } else {
       messageApi.open({
         type: "error",
         content: res.message,
       });
     }
   };
 
   const getSavoryById = async () => {
     let res = await GetSavoryById(Number(id));
     if (res) {
      setSavory(res);
       // set form ข้อมูลเริ่มที่เราแก้ไข
       form.setFieldsValue({ 
         Name: res.Name,
         Count: res.Count,
     });
     }
   };
 
   useEffect(() => {
    getSavoryById();
   }, []);
  return (
    <>
      {contextHolder}
      <div className='savoryUpdate-bg' style={{ background : "#eceef2"}}>
      <h1 className='savoryUpdate-header'>เเก้ไข ของคาว</h1>
      <div className='savoryDashbord-headline'/>
        <div className='savoryUpdate-form'>
        <Form onFinish={onFinish} autoComplete="off" form={form}>
            <div className='savoryUpdate-form-control'>
              <label className='savoryUpdate-text'>ชื่อ</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='savoryUpdate-form-control'>
              <label className='savoryUpdate-text'>ราคา</label>
              <br></br>
              <Form.Item name="Count">
                <InputNumber type='number' placeholder='Count'></InputNumber>
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
