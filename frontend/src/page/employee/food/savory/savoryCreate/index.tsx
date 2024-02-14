import  "./savoryCreate.css"
import { Form, message,  Input, InputNumber, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { SavoryInterface } from '../../../../../interface/ISavory';
import { CreateSavory } from '../../../../../services/https/food/savory';

export default function savoryCreate() {
  const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: SavoryInterface) => {
      let res = await CreateSavory(values);
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
      <div className='savoryCreate-bg' style={{ background : "#eceef2"}}>
      <h1 className='savoryCreate-header'>เพิ่ม ของคาว</h1>
      <div className='savoryCreate-headline'/>

        <div className='savoryCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='savoryCreate-form-control'>
              <label className='savoryCreate-text'>ชื่อ</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='savoryCreate-form-control'>
              <label className='savoryCreate-text'>ราคา</label>
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
