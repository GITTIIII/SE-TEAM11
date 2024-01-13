import { Link } from "react-router-dom"
import { message } from "antd"
import { useEffect, useState, createContext } from "react"
import { DeleteBookActivityByID, GetAllBookActivity } from "../../../services/https/bookActivity"
import { BookActivityInterface } from "../../../interface/IBookActivity"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookActivityUpdate from "./bookActivityUpdate"
import "./bookActivity.css"
export const idBookActivity = createContext(0);

export default function BookActivity() {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateClick, setupdateClick] = useState(false);
  const [BookActivity, setBookActivity] = useState<BookActivityInterface[]>([])
  const [BookActivityID, setBookActivityID] = useState(0);
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
      <idBookActivity.Provider value={BookActivityID}>
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
                    <div>กิจกรรม {item.Activity?.Activity_name}</div>
                    <div>เวลาเริ่ม {new Date(item.TimeStart!).toLocaleString()}</div>
                    <div>เวลาสิ้นสุด {new Date(item.TimeEnd!).toLocaleString()}</div>
                    <div>จำนวนคน {item.NumberOfPeople}</div>
                    <div>เบอร์โทร {item.Phone_number}</div>
                    <div>หมายเหตุ {item.Comment}</div>
                    <button className="submit_button" 
                      onClick={() => {
                        if(item.ID !== undefined){
                        setupdateClick(!updateClick);
                        setBookActivityID(item.ID);
                      }}}>
                      เเก้ไข
                    </button>
                    {updateClick && 
                      <div className="updatePopup">
                        <div className="updatePopup-icon" onClick={() => setupdateClick(!updateClick)}>
                          <FontAwesomeIcon icon={faXmark} size="2xl"/>
                        </div>
                        <BookActivityUpdate/>
                      </div>}
                    <button className="submit_button" onClick={() => DeleteBookActivity(item.ID)}>ลบ</button>
                  </div>
              ))}
        </div>
      </div>
      </idBookActivity.Provider>
    </>
  )
}
