import React, { useState } from 'react'
import  "./repair.css"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import ship from "../../../asset/ship.jpg"



export default function Repair() {

  const [photo, setPhoto] = useState("");

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setPhoto(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
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
        <form>
          <div className='repair-form-control'>
            <label className='repair-text'>Number of room</label>
            <br></br>
            <input className='repair-input' type="text"placeholder='Enter your room number' />
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Employee Name</label>
            <br></br>
            <input className='repair-input' type="text"placeholder='Enter your name' />
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
            <textarea className='repair-textarea' placeholder='Enter your detail'></textarea>
          </div>

          <div className='repair-form-control'>
            <label className='repair-text'>Upload your image</label>
            <br></br>
            <Upload {...props} accept='image/png, image/jpeg'>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* <input className='repair-input-file' type='file' accept='image/*'></input> */}
          </div>



          <div className='buttom-area'>
            <button type='submit'>ยืนยัน</button>
          </div>

        </form>
      </div>
      
    </div>

     

    </>
  )
}
