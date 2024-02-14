import  "./drinkCreate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { DrinkInterface } from '../../../../../interface/IDrink';
import { CreateDrink } from '../../../../../services/https/food/drink';

export default function drinkCreate() {
  const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: DrinkInterface) => {
      let res = await CreateDrink(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    };
  return (
    <>
      {contextHolder}
      <div className='drinkCreate-bg' style={{ background : "#eceef2"}}>
      <h1 className='drinkCreate-header'>เพิ่ม เครื่องดื่ม</h1>
      <div className='drinkCreate-headline'/>

        <div className='drinkCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='drinkCreate-form-control'>
              <label className='drinkCreate-text'>ชื่อ</label>
              <br></br>
              <Form.Item name="Name">
                <Input ></Input>
              </Form.Item>
            </div>

            <div className='drinkCreate-form-control'>
              <label className='drinkCreate-text'>ราคา</label>
              <br></br>
              <Form.Item name="Count">
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
