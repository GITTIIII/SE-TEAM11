import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import  "./room.css"
import { Button, ConfigProvider } from 'antd';
import cruise from "../../../asset/cruise.png"

export default function Room() {
  return (
    
      <div className='cruise-bg' style={{ backgroundImage: `url(${cruise})` }}>

        <h1 className='room-header'>Room</h1>

        <div className='room-headline'/>

        <NavLink to="/employee/room/create">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#CDF5FD',
                colorTextLightSolid: '#000000',
                colorPrimaryHover: '#89CFF3',
                colorPrimaryActive: '#818FB4'
              },
            }}
          >
            <Button className='room-add-button' type="primary">add a room</Button>
          </ConfigProvider>
        </NavLink>
        
      </div>

  )
}
