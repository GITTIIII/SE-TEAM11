import React, { useEffect, useState } from "react";
import { GetAllPayment } from "../../../services/https/payment";
import { PaymentInterface } from "../../../interface/IPayment";
import { Image } from "antd";
import { BookPlanInterface } from "../../../interface/IBookPlan";
import { GetAllBookPlan } from "../../../services/https/bookPlan";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
export default function ShowPayment() {
  const [listPayment, setAllPayment] = useState<PaymentInterface[]>([]);
  const [listBookplan, setAllBookplan] = useState<BookPlanInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getAllPayment = async () => {
    let res = await GetAllPayment();
    if (res) {
      setAllPayment(res);
    }
  };

  const getAllBookPlan = async () => {
    let res = await GetAllBookPlan();
    setAllBookplan(res);
  };

  useEffect(() => {
    getAllPayment();
  }, []);


  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 3;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = listPayment.slice(startIndex, endIndex);

  return (
    <>
      <div className="repair-table-show">
        <h1 className="repair-text-home">ชำระเงิน</h1>
        <hr />
        <br />
        <div className="repair-table">
          <table className="repair-content-table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ</th>
                <th>แผนการเที่ยว</th>
                <th>ราคา</th>
                <th>รูปภาพ</th>
                <th>สถานะ</th>
                <th>เวลา</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((item, index) => (
                <tr key={index}>
                  <td>{item.ID}</td>
                  <td>{item.BookPlan?.Tourist?.Tourist_name}</td>
                  <td>{item.BookPlan?.Planner?.Plan_name}</td>
                  <td>{item.Price}</td>
                  <td>
                    <Image
                      src={`${item.Payment_img}`}
                      width="100px"
                      height="100px"
                    ></Image>
                  </td>
                  <td>
                    <p
                      className={
                        Object(item.BookPlan?.Payment_status) == "ชำระเงินเสร็จสิ้น"
                          ? `green`
                          : `red`
                      }
                    >
                      {item.BookPlan?.Payment_status}
                    </p>
                  </td>
                  <td>{new Date(item.CreatedAt!).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="repair-paging">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="repair-paging-backward"
            >
              <IoIosArrowBack />
            </button>
            <span className="repair-current-page">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= listPayment.length}
              className="repair-paging-forward"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
