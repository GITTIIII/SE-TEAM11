import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import  "./repair.css"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload, DatePicker ,Form} from 'antd';
import ship from "../../../asset/ship.jpg"

import { CreateRepair } from '../../../services/https/repair';
import { RepairInterface } from '../../../interface/IRepair';



export default function Repair() {

  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [comment, setComment] = useState("");

const handleSubmit = async (values: RepairInterface) => {
  values.Comment = comment
  values.Repair_img = repair_img

  console.log(values)

  let res = await CreateRepair(values);
  if (res.status) {
    messageApi.open({
      type: "success",
      content: "บันทึกข้อมูลสำเร็จ",
    });
    setTimeout(function () {
      // navigate("/");
    }, 2000);
  } else {
    messageApi.open({
      type: "error",
      content: "บันทึกข้อมูลไม่สำเร็จ",
    });
  }
};

  const [repair_img, setRepair_Img] = useState("");

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setRepair_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };
  
      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };


  return (
    <>

    <div className='login-bg' style={{ backgroundImage: `url(${ship})` }}>

    <h1 className='repair-header'>Repair</h1>
      
      
      <div className='repair-form'>
        <Form onFinish={handleSubmit}>
          <div className='repair-form-control'>
            <label className='repair-text'>Number of room</label>
            <br></br>
            <input className='repair-input' type="text"placeholder='Enter your room number' required />
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Employee Name</label>
            <br></br>
            <input className='repair-input' type="text"placeholder='Enter your name' required />
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Repair Type</label>
            <br></br>
            <div className='repair-select'>
              <select className='repair-select-custom'>
                <option className='repair-option'>ทั่วไป</option>
                <option className='repair-option'>ไฟฟ้า</option>
                <option className='repair-option'>ประปา</option>
              </select>
            </div>

          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Repair Detail</label>
            <br></br>
            <textarea className='repair-textarea' placeholder='Enter your detail' required value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Upload your image</label>
            <br></br>
            <Upload {...props} accept='image/png, image/jpeg' action="/Repair">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* <input className='repair-input-file' type='file' accept='image/*'></input> */}
          </div>

          {/* <div className='repair-form-control'>
            <label className='repair-text'>Date</label>
            <br></br>
            <input type='datetime-local'/>
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Date</label>
            <br></br>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
            />
          </div> */}



          <div className='buttom-area'>
            <button type='submit'>ยืนยัน</button>
          </div>

        </Form>
      </div>
      
    </div>

     

    </>
  )
}
