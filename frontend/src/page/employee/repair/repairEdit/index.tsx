import React from 'react'
import './repairEdit.css'
import { Button } from 'antd';
import { CloseOutlined } from "@ant-design/icons";

function RepairEdit({
    open,
    onClose,
}:{
    open: React.ReactNode;
    onClose: React.MouseEventHandler<HTMLAnchorElement>;
}) {
    if(!open) return null
  return (
    <>
    <div className='repair-edit'>
    <a onClick={onClose}>Close</a>
    
    </div>
    
    </>
    

  )
}

export default RepairEdit
