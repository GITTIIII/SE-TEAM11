import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./repairCreate.css";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  message,
  Upload,
  Form,
  Select,
  DatePicker,
  DatePickerProps,
  Carousel,
} from "antd";
import repair from "../../../../asset/RepairCreateBackground.png";
import repairRoom1 from "../../../../asset/RepairItem1.jpg";
import repairRoom2 from "../../../../asset/RepairItem2.jpg";
import repairRoom3 from "../../../../asset/RepairItem3.jpg";
import { CreateRepair } from "../../../../services/https/repair";
import { RepairInterface } from "../../../../interface/IRepair";
import { GetAllRepairType } from "../../../../services/https/repairType";
import { RepairTypeInterface } from "../../../../interface/IRepairType";
import { RoomInterface } from "../../../../interface/IRoom";
import { GetAllRoom } from "../../../../services/https/room";
import dayjs from "dayjs";


export default function RepairCreate() {
  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [roomNumber, setRoomNumber] = useState<RoomInterface[]>([]);
  const [rDate, setRDate] = useState<any>(dayjs());
  const [repair_img, setRepair_Img] = useState("");
  const [comment, setComment] = useState("");
  const [type, setType] = useState<RepairTypeInterface[]>([]);
  const [input, setInput] = useState({
    RepairTypeID: 0,
    RoomID: 0,
  });

  const [currentImage, setCurrentImage] = useState(0);

  const EmployeeID = localStorage.getItem("EmployeeID");

  const images = [repairRoom1, repairRoom2,repairRoom3]; // เพิ่มรูปภาพตามความต้องการ
  const numberOfImages = images.length;

  const getRoom = async () => {
    let res = await GetAllRoom();

    if (res) {
      setRoomNumber(res);
    }
  };

  const getRepairType = async () => {
    let res = await GetAllRepairType();

    if (res) {
      setType(res);
    }
  };

  useEffect(() => {
    getRepairType();
    getRoom();
    // autoplay();
    // const intervalId = setInterval(autoplay, 5000);
    // return () => clearInterval(intervalId);
  }, []);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };

  const autoplay = () => {
    setCurrentImage((prev) => (prev + 1) % numberOfImages);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % numberOfImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + numberOfImages) % numberOfImages);
  };

 
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  const handleSubmit = async (values: RepairInterface) => {
    values.Comment = comment;
    values.Repair_img = repair_img;
    values.RepairTypeID = input.RepairTypeID;
    values.EmployeeID = Number(EmployeeID);
    values.RoomID = input.RoomID;
    values.Repair_date = rDate;
    values.Repair_status = "กำลังดำเนินการ";

    console.log(rDate);

    console.log(values);

    let res = await CreateRepair(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("../repair");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Type assertion to string
        // เปลี่ยน setImage เพื่อทำการใช้ base64String
        setRepair_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChange = (date: dayjs.Dayjs | null, dateString: string) => {
    console.log(date);
    setRDate(date);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className="login-bg" style={{ backgroundImage: `url(${repair})` }}>
        {contextHolder}
        <div className="repair-create-content">
          <div className="repair-create-header">
            <h1 className="repair-text">สร้างคำขอการแจ้งซ่อม</h1>
          </div>

          <div className="repair-create-content-left-right">
            <div className="repair-form">
              <Form onFinish={handleSubmit}>
                <div className="repair-form-control">
                  <label className="repair-text">หมายเลขห้องพัก</label>
                  <br />
                  <Select
                    showSearch
                    placeholder="กรุณาเลือกหมายเลขห้องพัก"
                    className="repair-select-antd"
                    optionFilterProp="children"
                    onChange={(value) =>
                      handleInput({ target: { name: "RoomID", value } })
                    }
                    filterOption={filterOption}
                    options={roomNumber.map((item) => {
                      return {
                        label: `${item.Room_number}`,
                        value: `${item.ID}`,
                      };
                    })}
                  />
                </div>

                <div className="repair-form-control">
                  <label className="repair-text">
                    ประเภทการแจ้งซ่อมที่ต้องการได้รับบริการ
                  </label>
                  <br></br>
                  <div className="repair-select">
                    <select
                      className="repair-select-custom"
                      name="RepairTypeID"
                      onChange={handleInput}
                      required
                    >
                      <option value="none" hidden>
                        เลือกประเภท
                      </option>
                      {type.map((item) => (
                        <option value={item.ID} key={item.Repair_name}>
                          {item.Repair_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="repair-form-control">
                  <label className="repair-text">รายละเอียด</label>
                  <br></br>
                  <textarea
                    className="repair-textarea"
                    placeholder="กรอกรายละเอียด"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="repair-form-control">
                  <label className="repair-text">วันที่ต้องการรับบริการ</label>
                  <br></br>
                  <DatePicker
                    value={rDate}
                    onChange={onChange}
                    format="YYYY-MM-DD"
                  />
                </div>

                <div className="repair-form-control">
                  <label className="repair-text">อัพโหลดรูปภาพ</label>
                  <br></br>
                  <input
                    className="repair-input-file"
                    id="repair_img"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="buttom-area">
                  <button type="submit">ยืนยัน</button>
                </div>
              </Form>
            </div>

            <div
              className="repair-create-content-right"
              style={{ backgroundImage: `url(${images[currentImage]})` }}
            >


              <button className="prev" onClick={prevImage}>
                &lt;
              </button>
              <button className="next" onClick={nextImage}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
