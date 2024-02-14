import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, DatePicker } from "antd";
import planetBG from "../../../asset/planetBG.png";
import "./checkIn.css";
import { CreateCheckIn } from "../../../services/https/checkIn";
import {
  UpdateCheckInStatus,
  GetBookPlanByDate,
} from "../../../services/https/bookPlan";
import { BookPlanInterface } from "../../../interface/IBookPlan";

const gridStyle: React.CSSProperties = {
  width: "33.33%",
  textAlign: "left",
};

export default function CheckIn() {
  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [bookPlan, setBookPlan] = useState<BookPlanInterface[]>([]);
  const [dateBookPlan, setDateBookPlan] = useState<string>("");
  const [query, setQuery] = useState("");

  let { date } = useParams();
  const getBookPlans = async () => {
    let res = await GetBookPlanByDate(date);
    if (res) {
      setBookPlan(res);
    }
  };

  console.log(bookPlan);

  const handleDate = (date: any, dateString: string) => {
    setDateBookPlan(dateString);
    console.log(dateBookPlan);
  };

  const searchByDate = async () => {
    let res = await GetBookPlanByDate(dateBookPlan);
    if (res) {
      console.log(res);
      setBookPlan(res);
      navigate(`/employee/check-in/${dateBookPlan}`);
    }
  };

  const handleStatusChange = async (bookPlanId: number) => {
    let res = await UpdateCheckInStatus(bookPlanId);

    if (res.status) {
      setBookPlan((prevBookPlans) =>
        prevBookPlans.map((bookPlan) =>
          bookPlan.ID === bookPlanId
            ? { ...bookPlan, checkIn_status: "ลงทะเบียนเข้าพักสำเร็จ" }
            : bookPlan
        )
      );

      let checkInRes = await CreateCheckIn({ BookPlanID: bookPlanId });

      if (checkInRes.status) {
        messageApi.success("ลงทะเบียนเข้าพักสำเร็จ");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        messageApi.error("ลงทะเบียนเข้าพักไม่สำเร็จ");
      }
    } else {
      messageApi.error("ลงทะเบียนเข้าพักไม่สำเร็จ");
    }
  };

  const filteredBookPlans = bookPlan.filter((BookPlanItem) =>
    Object.values(BookPlanItem).some(
      (Phone) =>
        BookPlanItem.Tourist?.Phone &&
        BookPlanItem.Tourist.Phone.toLowerCase().includes(query.toLowerCase())
    )
  );

  useEffect(() => {
    getBookPlans();
  }, []);

  return (
    <div
      className="checkIn-cruise-bg"
      style={{
        backgroundImage: `url(${planetBG})`,
        width: "100%",
        padding: "0 70px",
      }}
    >
      {contextHolder}
      <h1 className="checkIn-header">ลงทะเบียนเข้าพัก</h1>
      <hr />
      <div className="checkIn-date">
        <div className="checkIn-date-text">วันที่เริ่มเดินทาง:</div>
        <DatePicker
          onChange={handleDate}
          placeholder="วันที่เริ่มเดินทาง"
          style={{ width: "200px", height: "40px" }}
        />
        <button className="checkIn-search-button" onClick={searchByDate}>
          ค้นหา
        </button>
        <div className="checkIn-search-box">
          <input
            className="checkIn-search-input"
            type="text"
            placeholder="ค้นหาด้วยเบอร์โทร"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="checkIn-display">
        {filteredBookPlans.map((book_plan, index) => (
          <Card
            className="checkIn-card"
            title={book_plan?.Tourist?.Tourist_name}
          >
            <Card.Grid hoverable={false} style={gridStyle}>
              <img
                src={book_plan?.Room?.Room_img}
                alt={`Room Image - ${book_plan?.Room?.Room_number}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              <p>
                <b>เบอร์โทรศัพท์ : </b>
                {book_plan?.Tourist?.Phone}
              </p>
              <p>
                <b>แผนการเดินทาง : </b>
                {book_plan?.Planner?.Plan_name}
              </p>
              <p>
                <b>วันที่เริ่มเดินทาง : </b>
                {book_plan.Planner?.TimeStart
                  ? new Date(book_plan.Planner.TimeStart).toLocaleDateString()
                  : null}
              </p>
              <p>
                <b>หมายเลขห้องพัก : </b>
                {book_plan?.Room?.Room_number}
              </p>
              <p>
                <b>ชุดอาหาร : </b>
                {book_plan?.FoodSet?.Name}
              </p>
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              <p
                className={
                  book_plan.CheckIn_status === "ลงทะเบียนเข้าพักสำเร็จ"
                    ? `superblue`
                    : `superred`
                }
              >
                {"\u00A0"} สถานะ : {book_plan.CheckIn_status}
              </p>
              <button
                className="checkIn-check-in-button"
                onClick={() =>
                  book_plan.ID !== undefined && handleStatusChange(book_plan.ID)
                }
              >
                เช็คอิน
              </button>
            </Card.Grid>
          </Card>
        ))}
      </div>
    </div>
  );
}
