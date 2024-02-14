import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Form, Card, Button } from "antd";
import "./review.css";
import { ReviewInterface } from "../../../interface/IReview";
import Destination from "../../employee/destination";
import { CreateReview, GetReviewById } from "../../../services/https/review";
import Swal from "sweetalert2";


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

export default function Review() {
  let { id } = useParams();
  const TouristID = localStorage.getItem("TouristID");
  const [IdReviews, setIdReviews] = useState(0);
  const [comment, setComment] = useState<String>("");
  const [error, setError] = useState<number>(1);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getReviews = async () => {
    let res = await GetReviewById(Number(id));
    if (res) {
      setReviews(res);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  const getIdReviews = async () => {
    let res = await GetReviewById(Number(id));
    if (res) {
      setIdReviews(res.ID);
    }
  };
  useEffect(() => {
    getIdReviews();
  }, []);

  useEffect(() => {
    if (error == 1) {
      setError(2);
    }
    else {
      createReview()
    }
  }, [comment]);

  const createReview = async () => {
    setConfirmLoading(true);
    let res = await CreateReview(getReview);
    getReviews();

    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "Review success",
      });
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "Review unsuccess",
      });
    }
    setConfirmLoading(false);
  };
  useEffect(() => {
    getReviews();
  }, []);

  const getReview: ReviewInterface = {
    Comment: comment,
    TouristID: Number(localStorage.getItem("TouristID")),
    PlannerID: Number(id)
  }

  const test = () => {
    Swal.fire({
      title: "เขียนรีวิว",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "post",

      showLoaderOnConfirm: true,

      inputValidator: (value) => {
        if (value) {
          setComment(value);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }
    );

  }
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="review-bg">
        <div className="review-blur">
          <Button className="review-button" onClick={test}>
            เขียนรีวิว
          </Button>
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
              {reviews.map((review, index) => (
                <Card
                  key={index}

                  style={{ width: 300, height: '100%', margin: 16 }}
                >
                  <Meta
                    className="review-box-card"
                    title={review.Tourist?.Tourist_name}
                    description={`รีวิว : ${review.Comment
                      }
                    `}
                  />

                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
