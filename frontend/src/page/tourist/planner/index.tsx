import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Form, Card,Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./showPlanner.css";
import { GetAllPlanner } from "../../../services/https/planner";
import { PlannerInterface } from "../../../interface/IPlanner";
import Destination from "../../employee/destination";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// const gridStyle: React.CSSProperties = {
//   width: '25%',
//   textAlign: 'left',
// };

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "480px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function ShowPlanner() {
  const navigate = useNavigate();
  const [planners, setAllPlanner] = useState<PlannerInterface[]>([]);
  const GetPlanner = async () => {
    let res = await GetAllPlanner();
    if (res) {
      setAllPlanner(res);
    }
  };
  useEffect(() => {
    GetPlanner();
  }, []);

  return (
    <div className="showDestination-bg">
      <div className="showDestination-blur">
        <div style={{ justifyItems: "center", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {planners.map((planner, index) => (
              <Card
                key={index}
                // hoverable
                style={{ width: 300, height: 350, margin: 16 }}
                cover={
                  <img
                    alt="Planner Image"
                    src={planner.Plan_img}
                    width={150}
                    height={175}
                  />
                }
              >
                <Meta
                  className="box-card"
                  title={planner.Plan_name}
                  description={`จาก - ถึง : ${
                    planner.Destination?.Destination_name
                  }, ราคา : ${
                    planner.Plan_price
                  } บาท , วันเดินเรือ : ${new Date(
                    planner.TimeStart!
                  ).toLocaleDateString()} , หมายเหตุ : ${
                    planner.Destination?.Comment
                  }`}
                />
                <Button onClick={() => navigate(`/tourist/review/${planner.ID}`)} type="primary" style={{ marginTop: 16 }}>
                  <FontAwesomeIcon icon={faPenToSquare} className="review-icon" />
                  <label>รีวิว</label>
                  </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
