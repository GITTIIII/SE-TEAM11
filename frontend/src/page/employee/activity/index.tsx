import React from 'react'
import { Link } from 'react-router-dom'

export default function Activity() {
  

  return (
    <div className="activity-box">
      <label>Activity</label>
      <br />
      <Link to="create">สร้างกิจกรรม</Link>
    </div>
  )
}
