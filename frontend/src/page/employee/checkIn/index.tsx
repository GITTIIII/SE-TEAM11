import React, { useState } from 'react'
import cruise from "../../../asset/cruise.png";
import "./checkIn.css"

export default function CheckIn() {
  return (
    <div className="checkIn-cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      <h1 className='checkIn-header'>Check-In</h1>
      <div className="checkIn-headline" />
      <div className='checkIn-form'>
      <div className='checkIn-text'>Book Plan ID</div>
        <div className='checkIn-form-control'>
          <input 
            className='checkIn-input' 
            type="text" placeholder = 'Enter book plan ID'
          />
          <div className='checkIn-buttom-area'>
          <button type='submit'>search</button>
        </div>
        </div>
      </div>
    </div>
    
  )
}