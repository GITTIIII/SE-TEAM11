import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, message, Image } from "antd";
import { ChangeEvent, createContext, useEffect, useState } from "react";
import { PaymentInterface } from "../../../interface/IPayment";
import { CreatePayment } from "../../../services/https/payment";
import { Link, useNavigate } from "react-router-dom";
import "./payment.css";

import background from "../../../asset/paymentBG.png";

import {
  GetBookPlanByTouristIdForPayment,
  GetBookPlanByIdForPayment,
} from "../../../services/https/payment";
import { BookPlanInterface } from "../../../interface/IBookPlan";
import { TouristInterface } from "../../../interface/ITourist";
import { GetTouristById } from "../../../services/https/tourist";
import HistoryPayment from "./historyPayment";

export const BookplanIDContext = createContext(0);

export default function Payment() {
  let navigate = useNavigate();

  const TouristID = localStorage.getItem("TouristID");

  const [showHistory, setShowHistory] = useState(false);
  const [selectedBookplanID, setSelectedBookplanID] = useState<number>(0);

  const [messageApi, contextHolder] = message.useMessage();

  const [bookplan, setBookplan] = useState<BookPlanInterface[]>([]);
  const [tourist, setTourist] = useState<TouristInterface>();

  const getTouristById = async () => {
    let res = await GetTouristById(Number(TouristID));
    setTourist(res);
  };

  const getBookPlanById = async () => {
    let res = await GetBookPlanByTouristIdForPayment(Number(TouristID));
    setBookplan(res);
  };

  useEffect(() => {
    getBookPlanById();
    getTouristById();
  }, []);

  const handleCancel = () => {
    setShowHistory(!showHistory);
  };

  return (
    <>
      <BookplanIDContext.Provider value={selectedBookplanID}>
        {contextHolder}
        <div
          className="payment-background"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="payment-content">
            <div className="payment-content-background">
              <div className="payment-content-header">
                <h2>รายการการจอง</h2>
              </div>
              {bookplan.length === 0 ? (
                <div className="payment-no-content">
                  <p>ไม่มีข้อมูลการจอง</p>
                </div>
              ) : (
                <div className="payment-content-list-box">
                  <div className="payment-content-list-card">
                    {bookplan.map((item) => (
                      <Link
                        to={
                          item.Payment_status === "ชำระเงินเสร็จสิ้น"
                            ? "/tourist/payment"
                            : `create/${item.ID}`
                        }
                      >
                          <a
                            className="payment-content-card"
                            key={item.ID}
                            onClick={() => {
                              if (item.ID !== undefined) {
                                setSelectedBookplanID(item.ID);
                                setShowHistory(!showHistory);
                              }
                            }}
                          >
                            <p>หมายเลขการจอง : {item.ID}</p>
                            <p>ชื่อผู้จอง : {item.Tourist?.Tourist_name}</p>
                            <p>แผนการท่องเที่ยว : {item.Planner?.Plan_name}</p>
                            <p
                              className={
                                Object(item.Payment_status) ==
                                "ชำระเงินเสร็จสิ้น"
                                  ? `payment-status-green`
                                  : `payment-status-red`
                              }
                            >
                              สถานะ : {item.Payment_status}
                            </p>
                          </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {showHistory && (
              <div className="updatePopup">
                <div className="update-form">
                  <HistoryPayment onCancel={handleCancel} />
                </div>
              </div>
            )}
          </div>
        </div>
      </BookplanIDContext.Provider>
    </>
  );
}
