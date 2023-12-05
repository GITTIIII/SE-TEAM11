import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import  "./repair.css"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload, DatePicker ,Form} from 'antd';
import ship from "../../../asset/ship.jpg"


import { CreateRepair ,GetAllRepair} from '../../../services/https/repair';
import { RepairInterface } from '../../../interface/IRepair';



export default function Repair() {

  const [comment, setComment] = useState("");

  async function getAllRepair(){
    const data = await GetAllRepair();
    setComment(data.comment);
  }

  useEffect(() => {
    getAllRepair();
  }, []);

  


  return (
    <>

    <div className='login-bg' style={{ backgroundImage: `url(${ship})` }}>
    <h1 className='repair-text'>Repair</h1>
    <div className='repair-form'>
    <Link to="create">แจ้งซ่อม</Link>
    <br></br>
    <label>รายการ {comment}</label>

    </div>
    
    
      
    
      
    </div>

     

    </>
  )
}
