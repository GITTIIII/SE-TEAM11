import  "./savoryCreate.css"
import { Form, message,  Input, InputNumber, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
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
      console.log(res);
      }
    };
  return (
    <>
      {contextHolder}
      <div className='savoryCreate-bg' style={{ backgroundImage: `url(${ship})` }}>
      <h1 className='savoryCreate-header'>savory</h1>
        <div className='savoryCreate-form'>
        <Form onFinish={onFinish} autoComplete="off">
            <div className='savoryCreate-form-control'>
              <label className='savoryCreate-text'>savory</label>
              <br></br>
              <Form.Item name="Name">
                <Input placeholder='Name'></Input>
              </Form.Item>
            </div>

            <div className='savoryCreate-form-control'>
              <label className='savoryCreate-text'>Count</label>
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
