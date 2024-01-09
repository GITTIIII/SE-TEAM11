import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./repairCreate.css";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Form, Select,DatePicker } from "antd";
import ship from "../../../../asset/ship.jpg";

import { CreateRepair } from "../../../../services/https/repair";
import { RepairInterface } from "../../../../interface/IRepair";
import { GetAllRepairType } from "../../../../services/https/repairType";
import { RepairTypeInterface } from "../../../../interface/IRepairType";
import { RoomInterface } from "../../../../interface/IRoom";
import { GetAllRoom } from "../../../../services/https/room";

export default function RepairCreate() {
  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [comment, setComment] = useState("");

  const [roomNumber, setRoomNumber] = useState<RoomInterface[]>([]);

  const [type, setType] = useState<RepairTypeInterface[]>([]);
  const [input, setInput] = useState({
    RepairTypeID: 0,
    RoomID: 0,
  });

  const EmployeeID = localStorage.getItem("EmployeeID");

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
  }, []);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = async (values: RepairInterface) => {
    values.Comment = comment;
    values.Repair_img = repair_img;
    values.RepairTypeID = input.RepairTypeID;
    values.EmployeeID = Number(EmployeeID);
    values.RoomID = input.RoomID;

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
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };

  const [repair_img, setRepair_Img] = useState("");

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setRepair_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };

      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const [Cdate, setDate] = useState(new Date().toLocaleDateString('th-TH'));

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        {contextHolder}

        <h1 className="repair-text">Repair</h1>

        <div className="repair-form">
          <Form onFinish={handleSubmit}>
            <div className="repair-form-control">
              <label className="repair-text">Number of room</label>
              <br />
              <Select
                showSearch
                placeholder="Select your room"
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

            {/* <div className='repair-form-control'>
            <label className='repair-text'>Number of room</label>
            <br></br>
            <div className='repair-select'>
            <select className="repair-select-custom" name="RoomID" onChange={handleInput} required>
                  <option value="none" hidden>เลือกประเภท</option>
                  {roomNumber.map((item) => (
                  <option value={item.ID} key={item.Room_number}>{item.Room_number}</option>
                  ))}
            </select>
            </div>
          </div> */}

            <div className="repair-form-control">
              <label className="repair-text">Repair Type</label>
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
              <label className="repair-text">Repair Detail</label>
              <br></br>
              <textarea
                className="repair-textarea"
                placeholder="Enter your detail"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="repair-form-control">
              <label className="repair-text">Upload your image</label>
              <br></br>
              <Upload
                {...props}
                accept="image/png, image/jpeg"
                action="/Repair"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>


          <div className='repair-form-control'>
            <label className='repair-text'>Date</label>
            <br></br>
            <DatePicker
             
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              // value={Cdate}
              // onChange={(date) => {
              //   const d = new Date(date).toLocaleDateString('th-TH');
              //   console.log(d);
              //   setDate(d);
              // }}
            />
          </div>

            <div className="buttom-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
