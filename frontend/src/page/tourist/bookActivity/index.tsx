import { Link } from "react-router-dom"
import { useEffect, useState, createContext  } from "react"
import { message } from "antd"
import { DeleteBookActivityByID, GetAllBookActivity } from "../../../services/https/bookActivity"
import { BookActivityInterface } from "../../../interface/IBookActivity"
import "./bookActivity.css"
import BookActivityUpdate from "./bookActivityUpdate"

export const BookActivityID = createContext(0);

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
      <div className="login-bg" style={{ backgroundColor: `wheat` }}>
        {contextHolder}
        <div className="book-activity-list-box">
            <h1>จองกิจกรรม</h1>
            <Link to="bookActivityCreate">
              <div className="activity-button">
                เพิ่มการจองกิจกรรม
              </div>
            </Link>
              {BookActivity.map((item, index) => (
                  <div key={index} className="information">
                    <div>เวลาเริ่ม {new Date(item.TimeStart!).toLocaleString()}</div>
                    <div>เวลาสิ้นสุด {new Date(item.TimeEnd!).toLocaleString()}</div>
                    <div>จำนวนคน {item.NumberOfPeople}</div>
                    <div>เบอร์โทร {item.Phone_number}</div>
                    <div>หมายเหตุ {item.Comment}</div>
                    <Link to="bookActivityUpdate">
                      <BookActivityID.Provider value={item.ID??0}>                     
                        <BookActivityUpdate />        
                      </BookActivityID.Provider>
                      <button className="submit_button">เเก้ไข</button>
                    </Link>
                    <button className="submit_button" onClick={() => DeleteBookActivity(item.ID)}>ลบ</button>
                  </div>
              ))}
        </div>
      </div>
    </>
  )
}
