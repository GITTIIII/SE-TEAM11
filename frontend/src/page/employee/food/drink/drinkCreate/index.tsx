import  "./drinkCreate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
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
          content: "บันทึกข้อมูลไม่สำเร็จ",
        });
      }
    };
  return (
    <>
      {contextHolder}
      <div className='drinkCreate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='drinkCreate-header'>drink</h1>
        <div className='drinkCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='drinkCreate-form-control'>
              <label className='drinkCreate-text'>drink</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='drinkCreate-form-control'>
              <label className='drinkCreate-text'>Count</label>
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
