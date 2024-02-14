import { Button, Image } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./historyPayment.css";
import { BookplanIDContext } from "..";
import {
  GetBookPlanByIdForPayment,
  GetPaymentByBookplanID,
} from "../../../../services/https/payment";
import { BookPlanInterface } from "../../../../interface/IBookPlan";
import { PaymentInterface } from "../../../../interface/IPayment";

function HistoryPayment({ onCancel }: { onCancel: () => void }) {
  const bookplanID = useContext(BookplanIDContext);

  const [historyBookplan, setHistoryBookplan] = useState<BookPlanInterface>({});

  const [payment, setPayment] = useState<PaymentInterface>({});

  const getBookPlanById = async () => {
    let res = await GetBookPlanByIdForPayment(Number(bookplanID));
    setHistoryBookplan(res);
  };

  const getPaymentByBookplanid = async () => {
    let res = await GetPaymentByBookplanID(Number(bookplanID));
    setPayment(res);
  };

  useEffect(() => {
    getBookPlanById();
    getPaymentByBookplanid();
  }, []);

  console.log(payment);
  console.log(bookplanID);
  return (
    <>
      <div className="payment-pop-up">
        <div className="repair-edit-close-button">
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        </div>
        <div className="payment-pop-up-header">
          <h2>การจองหมายเลขที่ {historyBookplan.ID}</h2>
        </div>
        <div className="payment-pop-up-content">
          <div className="payment-pop-up-content-box1">
            <p>สถานะการจอง: {historyBookplan.Payment_status}</p>
            <p>ผู้ชำระเงิน: {historyBookplan.Tourist?.Tourist_name}</p>
            <p>
              ชำระเงินเมื่อ: {new Date(payment.CreatedAt!).toLocaleDateString()}
            </p>
            <p>จำนวนเงิน: {payment.Price}</p>
          </div>
          <hr/>

          <div className="payment-pop-up-content-box2">
            <div>
              <p>
                หลักฐานการชำระเงิน <br />{" "}
              </p>
              <Image src={payment.Payment_img} width="135px" height="110px" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPayment;
