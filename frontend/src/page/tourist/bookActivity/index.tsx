import { Link, useLocation, useNavigate } from "react-router-dom"
import { Popconfirm, message } from "antd"
import { useEffect, useState, createContext } from "react"
import { DeleteBookActivityByID, GetAllBookActivityByTouristId } from "../../../services/https/bookActivity"
import { BookActivityInterface } from "../../../interface/IBookActivity"
import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityInterface } from "../../../interface/IActivity"
import { GetAllActivity } from "../../../services/https/activity"
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Scrollbar } from "swiper/modules";
import BookActivityUpdate from "./bookActivityUpdate"
import ship1 from "../../../asset/ship1.jpg"
import "./bookActivity.css"
import "swiper/css";
import 'swiper/css/scrollbar';

export const idBookActivity = createContext(0);

export default function BookActivity() {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateClick, setupdateClick] = useState(false);
  const [BookActivity, setBookActivity] = useState<BookActivityInterface[]>([])
  const [Activity, setActivity] = useState<ActivityInterface[]>([])
  const [BookActivityID, setBookActivityID] = useState(0);
  const TouristID = localStorage.getItem("TouristID");
  let navigate = useNavigate();
  
  async function GetBookActivity() {
    setBookActivity(await GetAllBookActivityByTouristId(Number(TouristID)))
  }

  async function GetActivity() {
    setActivity(await GetAllActivity())
  }

  async function DeleteBookActivity(id: number | undefined) {
    let res = await DeleteBookActivityByID(id);
    if (!res.status) {
      messageApi.open({
        type: "success",
        content: "ลบการจองเเล้ว",
      });
      setTimeout(function () {
        GetBookActivity();
      }, 100);
    }
  }

  const cancel = () => {
    message.error('Click on No');
  };

  useEffect(() => {
    GetBookActivity();
    GetActivity();
  }, [])

  const handleCancel = () => {
    setupdateClick(!updateClick);
  }

  return (
    <>
      <idBookActivity.Provider value={BookActivityID}>
        <div className="book-activity-bg" style={{ backgroundImage: `url(${ship1})` }}>
          {contextHolder}
          <div className="book-activity-display">
            <div className="book-activity-item-box">
              <Swiper
                breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween:50
                },
                700: {
                  slidesPerView: 2,
                },
                1030: {
                  slidesPerView: 3,
                },
                1350: {
                  slidesPerView: 4,
                },
                }}
                modules={[Scrollbar, A11y]}
                scrollbar={{ draggable: true }}
              >
                {Activity.map((item, index) => (
                  <SwiperSlide key={item.ID} className="SwiperSlide">
                      <div className="book-activity-item"
                          onClick={() => {
                            if(item.ID !== undefined){
                              navigate("bookActivityCreate",{state: item.ID});
                            }
                          }}>
                        <img
                        src={item.Activity_img?.startsWith('data:image/') 
                        ? item.Activity_img 
                        : require(`../../../asset/${item.Activity_img}`)
                        }
                        alt="Activity_img"
                        />
                        <label>{item.Activity_name}</label>
                      </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="book-activity-list-box">
              <div className="book-activity-list-box-top">
                <h1>จองกิจกรรม</h1>
                <Link to="bookActivityCreate">
                  <button className="activity-button">
                    <FontAwesomeIcon icon={faPlus} className="icon"/>
                    <label>เพิ่มการจองกิจกรรม</label>
                  </button>
                </Link>
              </div>
              <div className="card-box">
                <div className="card">
                  {BookActivity.map((item) => (
                      <div key={item.ID} className="information">
                          <img
                          src={item.Activity?.Activity_img?.startsWith('data:image/') 
                          ? item.Activity?.Activity_img 
                          : require(`../../../asset/${item.Activity?.Activity_img}`)
                          }
                          alt="Activity_img"
                          />
                        <div><label>กิจกรรม :</label> {item.Activity?.Activity_name}</div>
                        <div><label>วันที่ :</label> {new Date(item.Date!).toLocaleDateString()}</div>
                        <div><label>เวลา :</label> {item.Time}</div>
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
                          <FontAwesomeIcon icon={faPenToSquare} className="icon"/>
                          <label>เเก้ไข</label>
                        </button>
                        {updateClick && 
                          <div className="updatePopup">
                            <div className="update-form">
                              <BookActivityUpdate onCancel={handleCancel}/>
                            </div>
                          </div>}
                          <Popconfirm
                              title="ลบการจอง"
                              description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย"
                              onConfirm={() => DeleteBookActivity(item.ID)}
                              onCancel={() => cancel}
                              okText="Yes"
                              cancelText="No"
                          >
                          <button className="delete-button">
                            <FontAwesomeIcon icon={faTrashCan} className="icon" />
                            <label>ลบ</label>
                          </button>
                        </Popconfirm>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </idBookActivity.Provider>
    </>
  )
}
