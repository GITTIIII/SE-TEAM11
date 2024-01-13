import  "./dessertCreate.css"
import {  Form, message,  Input, InputNumber, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { DessertInterface } from '../../../../../interface/IDessert';
import { CreateDessert } from '../../../../../services/https/food/dessert';

export default function dessertCreate() {
  const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: DessertInterface) => {
      let res = await CreateDessert(values);
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
      <div className='dessertCreate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='dessertCreate-header'>dessert</h1>
        <div className='dessertCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='dessertCreate-form-control'>
              <label className='dessertCreate-text'>dessert</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='dessertCreate-form-control'>
              <label className='dessertCreate-text'>Count</label>
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
