import { Link } from "react-router-dom"
import ship from "../../../asset/ship.jpg"
import "./bookActivity.css"

export default function BookActivity() {

  return (
    <>
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        <Link to="bookActivityCreate">
          <div className="activity-button">
            เพิ่มการจองกิจกรรม
          </div>
        </Link>
      </div>
    </>
  )
}
