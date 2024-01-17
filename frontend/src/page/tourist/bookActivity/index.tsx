import { Link } from "react-router-dom"
import { message } from "antd"
import { useEffect, useState, createContext } from "react"
import { DeleteBookActivityByID, GetAllBookActivityByTouristId } from "../../../services/https/bookActivity"
import { BookActivityInterface } from "../../../interface/IBookActivity"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookActivityUpdate from "./bookActivityUpdate"
import "./bookActivity.css"
import ship1 from "../../../asset/ship1.jpg"
export const idBookActivity = createContext(0);

export default function BookActivity() {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateClick, setupdateClick] = useState(false);
  const [BookActivity, setBookActivity] = useState<BookActivityInterface[]>([])
  const [BookActivityID, setBookActivityID] = useState(0);
  const TouristID = localStorage.getItem("TouristID");
  async function GetBookActivity() {
    setBookActivity(await GetAllBookActivityByTouristId(Number(TouristID)))
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
      <div className="login-bg" style={{ backgroundImage: `url(${ship1})` }}>
        {contextHolder}
        <div className="book-activity-list-box">
            <h1>จองกิจกรรม</h1>
            <Link to="bookActivityCreate">
              <div className="activity-button">
                เพิ่มการจองกิจกรรม
              </div>
            </Link>
            <div className="card">
              {BookActivity.map((item, index) => (
                  <div key={index} className="information">
                      <img
                      src={item.Activity?.Activity_img?.startsWith('data:image/') 
                      ? item.Activity?.Activity_img 
                      : require(`../../../asset/${item.Activity?.Activity_img}`)
                      }
                      alt="Activity_img"
                      />
                    <div><label>กิจกรรม :</label> {item.Activity?.Activity_name}</div>
                    <div><label>เวลาเริ่ม :</label> {new Date(item.TimeStart!).toLocaleString()}</div>
                    <div><label>เวลาสิ้นสุด :</label> {new Date(item.TimeEnd!).toLocaleString()}</div>
                    <div><label>จำนวนคน :</label> {item.NumberOfPeople}</div>
                    <div><label>เบอร์โทร :</label> {item.Phone_number}</div>
                    <div><label>หมายเหตุ :</label> {item.Comment}</div>
                    <div className="button">
                    <button className="submit-button" 
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
                    <button className="delete-button" onClick={() => DeleteBookActivity(item.ID)}>ลบ</button>
                    </div>
                  </div>
              ))}
            </div>
        </div>
      </div>
      </idBookActivity.Provider>
    </>
  )
}
