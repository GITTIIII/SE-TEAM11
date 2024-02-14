import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message, Image } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { PaymentInterface } from "../../../../interface/IPayment";
import { CreatePayment } from "../../../../services/https/payment";
import { useNavigate, useParams } from "react-router-dom";
import "./paymentCreate.css";
import QR from "../../../../asset/QR.jpg";
import background from "../../../../asset/paymentBG.png";
import ktb from "../../../../asset/ktb.png";
import kbank from "../../../../asset/kbank (1).png";
import { GetBookPlanByIdForPayment } from "../../../../services/https/payment";
import { GetTouristById } from "../../../../services/https/tourist";
import { BookPlanInterface } from "../../../../interface/IBookPlan";
import { TouristInterface } from "../../../../interface/ITourist";

import generatePayload from "promptpay-qr";

import qrcode, { QRCodeToDataURLOptions } from "qrcode";

export default function PaymentCreate() {
  let navigate = useNavigate();

  const bookplanID = useParams();

  const TouristID = localStorage.getItem("TouristID");

  const [messageApi, contextHolder] = message.useMessage();
  const [payment_img, setPayment_img] = useState("");

  const [bookplan, setBookplan] = useState<BookPlanInterface>({});
  const [tourist, setTourist] = useState<TouristInterface>();

  const [promptPayData, setPromptPayData] = useState<string | null>(null);

  const getBookPlanById = async () => {
    let res = await GetBookPlanByIdForPayment(Number(bookplanID.id));
    setBookplan(res);
  };

  const getTouristById = async () => {
    let res = await GetTouristById(Number(TouristID));
    setTourist(res);
  };

  useEffect(() => {
    getBookPlanById();
    getTouristById();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Type assertion to string
        setPayment_img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateTotalAmount = () => {
    const travelPlanPrice = bookplan.Planner?.Plan_price || 0;
    const foodSetPrice = bookplan.FoodSet?.Count || 0;
    const roomPrice = bookplan.Room?.Room_price || 0;

    const totalAmount = travelPlanPrice + foodSetPrice + roomPrice;
    return totalAmount;
  };

  const generateQRCode = async () => {
    const mobileNumber = "084-168-2816";
    const amount = calculateTotalAmount();
    const payload = generatePayload(mobileNumber, { amount });
    const options: QRCodeToDataURLOptions = {
      type: "image/png",
      color: { dark: "#000", light: "#fff" },
    };

    try {
      const image = await qrcode.toDataURL(payload, options);
      setPromptPayData(image);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values: PaymentInterface) => {
    values.Payment_img = payment_img;
    values.Price = calculateTotalAmount();
    values.BookPlanID = bookplan.ID;

    let res = await CreatePayment(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("../Payment");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [bookplan, tourist]);

  return (
    <>
      {contextHolder}
      <div
        className="payment-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="payment-create-content">
          <div className="payment-create-content-background">
            <h2>Payment Detail</h2>

            <div className="payment-create-content-left">
              <div className="payment-create-content-left-top">
                <div className="payment-create-content-left-top-box1">
                  <p>ชื่อ: {tourist?.Tourist_name}</p>
                  <p>หมายเลขการจอง: {bookplan.ID} </p>
                </div>
                <div className="payment-create-content-left-top-box2">
                  <p>หมายเลขห้องพัก: {bookplan.Room?.Room_number}</p>
                  <p>ห้องพักประเภท: {bookplan.Room?.RoomType?.RoomType_name}</p>
                  <p>โซนห้องพัก: {bookplan.Room?.RoomZone?.RoomZone_name}</p>
                </div>
                <div className="payment-create-content-left-top-box3">
                  <p>แผนการเที่ยว: {bookplan.Planner?.Plan_name}</p>
                  <p>
                    วันที่เริ่มเดินทาง:
                    {bookplan.Planner?.TimeStart
                      ? new Date(
                          bookplan.Planner.TimeStart
                        ).toLocaleDateString()
                      : null}
                  </p>
                  {/* <p>
                    วันที่สิ้นสุดเดินทาง:
                    {bookplan.Planner?.TimeEnd
                      ? new Date(bookplan.Planner.TimeEnd).toLocaleDateString()
                      : null}
                  </p> */}
                </div>
              </div>

              <div className="payment-create-content-left-bottom">
                <div className="payment-create-content-left-bottom-box">
                  <div className="payment-create-content-left-bottom-box1">
                    <div className="payment-create-content-bank-box1">
                      <img src={`${ktb}`} width="80px" height="80px" />
                      <p>ธนาคารกรุงไทย 012-1-61744-0</p>
                    </div>
                    <div className="payment-create-content-bank-box2">
                      <img src={`${kbank}`} width="80px" height="80px" />
                      <p>ธนาคารกสิกร 030-2-22535-4</p>
                    </div>
                  </div>
                  <div className="payment-create-content-left-bottom-box2">
                    <div className="payment-vertical"></div>
                  </div>
                  <div className="payment-create-content-left-bottom-box3">
                    <div className="payment-create-content-left-qr-box">
                      {promptPayData && (
                        <img src={promptPayData} alt="PromptPay QR Code" />
                      )}
                      <p>
                        แสกนจ่ายด้วย QR Code <br /> PromptPay 0841682816 ศุภกร
                        ดำรงค์เชื้อ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-create-content-right">
            <div className="payment-create-content-right-background">
              <div className="payment-create-content-right-top">
                <div className="payment-create-content-right-top-header">
                  <h2>Payment Receipt</h2>
                </div>

                <div className="payment-create-content-right-top-box">
                  <p>
                    ราคาค่าแผนการเดินทาง :{" "}
                    {bookplan.Planner?.Plan_price?.toLocaleString()}{" "}
                  </p>
                  <p>
                    ราคาค่าอาหาร : {bookplan.FoodSet?.Count?.toLocaleString()}
                  </p>
                  <p>
                    ราคาค่าห้อง : {bookplan.Room?.Room_price?.toLocaleString()}
                  </p>

                  <p className="payment-create-price">
                    ราคารวมสุทธิ : {calculateTotalAmount().toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="payment-create-content-right-bottom">
                <Form onFinish={handleSubmit}>
                  <div className="repair-form-control">
                    <label>อัพโหลดรูปภาพ</label>
                    <br></br>
                    <input
                      id="repair_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="payment-button-area">
                    <button type="submit">ยืนยัน</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
