import { Link } from "react-router-dom"
import "./bookActivity.css"
import { DeleteBookActivityByID, GetAllBookActivity } from "../../../services/https/bookActivity"
import { useEffect, useState } from "react"
import { BookActivityInterface } from "../../../interface/IBookActivity"
import { message } from "antd"

export default function BookActivity() {
  const [messageApi, contextHolder] = message.useMessage();
  const [BookActivity, setBookActivity] = useState<BookActivityInterface[]>([])
  async function GetBookActivity() {
    setBookActivity(await GetAllBookActivity())
  }

  async function DeleteBookActivity(id: number | undefined) {
    let res = await DeleteBookActivityByID(id);
    if (!res.status) {
      messageApi.open({
        type: "success",
        content: "ลบการจองเเล้ว",
      });
      setTimeout(function () {
        window.location.reload();
      }, 100);
    }
  }

  useEffect(() => {
    GetBookActivity()
  }, [])

  return (
    <>
      <div className="login-bg">
        {contextHolder}
      <div className="bookactivity-list">
              {BookActivity.map((item, index) => (
                <div key={index} className="infomation">
                  <div>เวลาเริ่ม {item.TimeStart}</div>
                  <div>เวลาสิ้นสุด {item.TimeEnd}</div>
                  <div>จำนวนคน {item.NumberOfPeople}</div>
                  <div>เบอร์โทร {item.Phone_number}</div>
                  <div>หมายเหตุ {item.Comment}</div>
                  <button className="submit_button" onClick={() => DeleteBookActivity(item.ID)}>ลบ</button>
                </div>
              ))}
            </div>
        <Link to="bookActivityCreate">
          <div className="activity-button">
            เพิ่มการจองกิจกรรม
          </div>
        </Link>
      </div>
    </>
  )
}
