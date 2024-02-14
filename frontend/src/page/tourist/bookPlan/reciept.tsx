import { useEffect, useState } from 'react'
import "./bookPlan.css"
import { Form, Button, message, Modal } from 'antd';
import ship1 from "../../../asset/ship1.jpg"
import logo1 from "../../../asset/logo1.png"
import { BookPlanInterface } from '../../../interface/IBookPlan';
import { useNavigate } from 'react-router-dom';
import { GetTouristById } from '../../../services/https/tourist';
import { GetBookPlanByTouristId, DeleteBookPlanByID } from '../../../services/https/bookPlan';

export default function Reciept() {
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();
  const [tourist, setTourist] = useState(null);
  const [BookPlanID, setBookPlanID] = useState<BookPlanInterface[]>([])
  const TouristID = localStorage.getItem("TouristID")
  console.log(tourist)

  useEffect(() => {
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
      console.log(tourist)
    };
    fetchData();
  }, []);

  async function GetBookPlanByID() {
    setBookPlanID(await GetBookPlanByTouristId(Number(TouristID)))
  }

  useEffect(() => {
    GetBookPlanByID()
  }, [])

  async function DeleteBookPlan(id: number | undefined) {
    let res = await DeleteBookPlanByID(id);
    if (!res.status) {
      messageApi.open({
        type: "success",
        content: "ลบการจองเเล้ว",
      });
      setTimeout(function () {
        navigate("/tourist/bookPlan");
      }, 2000);
    }
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText1, setModalText1] = useState<String>();
  const [modalText2, setModalText2] = useState<String>();
  const [modalText3, setModalText3] = useState<String>();
  const [modalText4, setModalText4] = useState<String>();
  const [modalText5, setModalText5] = useState<String>();
  const [modalText6, setModalText6] = useState<String>();
  const [nameTourist, setNameTourist] = useState<String>();
  const showModal = () => {
    setModalText1(`แผนการเดินทาง : `);
    setModalText2(`หมายเลขห้องพัก : `);
    setModalText3(`เซ็ตอาหาร : `);
    setModalText4(`ราคาสุทธิ : `);
    setModalText5(`หมายเลขนักท่องเที่ยว : `);
    setModalText6(`หมายเลขการจอง : `);
    setNameTourist(Object(tourist).Tourist_name);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/tourist/payment");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const headingStyle = {
    color: '',
  };


  return (
    <div className="bookPlan-bg" style={{ backgroundImage: `url(${ship1})` }}>
      <div className="bookplan-box">
        {contextHolder}
        <Form>
          <div className="icon">
            <img src={logo1} alt="logo" />
            <h2 style={headingStyle}>ขอบคุณที่ใช้บริการของเรา</h2>
            <br></br>
            <h1>สวัสดีคุณ {Object(tourist).Tourist_name}</h1>
          </div>
          <div className='cover'>
            <div className="buttom-area">
              <div className="login-button">
                <button type="submit" onClick={showModal}>ดูผลการจอง</button>
                <Modal title={"ผลลัพธ์การจองของคุณ " + nameTourist} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <Button onClick={() => DeleteBookPlan(BookPlanID[0].ID)}><label style={{color:'red'}}>ยกเลิกการจอง</label></Button>
                    <CancelBtn />
                    <OkBtn />
                  </>
                )}>
                  <br></br>
                  {BookPlanID.map((item, index) => (
                    <div key={index}>
                      <p>{modalText1}{item.Planner?.Plan_name}</p><br></br>
                      <p>{modalText2}{item.Room?.Room_number}</p><br></br>
                      <p>{modalText3}{item.FoodSet?.Name}</p><br></br>
                      <p>{modalText4}
                        {(item.FoodSet?.Count ?? 0) + (item.Planner?.Plan_price ?? 0) + (item.Room?.Room_price ?? 0)} บาท
                      </p>
                      {/* <Button onClick={() => DeleteBookPlan(item.ID)}><label>ยกเลิกการจอง</label></Button> */}
                      <p className='cap-1'>{modalText5}{Object(tourist).ID}</p>
                      <p className='cap-1' >{modalText6}{item.ID}</p>
                      <p className='cap'>โปรดแคปหน้าจอเพื่อแสดงให้เรา !</p>
                    </div>
                  ))}
                </Modal>
              </div>
            </div>
            <p className='please-text'>โปรดแคปหน้าจอเพื่อแสดงให้เรา !</p>
          </div>
        </Form>
      </div>
    </div>
  )
}
