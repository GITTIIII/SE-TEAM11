import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
} from "react";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, Form, Button, DatePicker } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import { DestinationInterface } from "../../../../interface/IDestination";
import { CreatePlanner } from "../../../../services/https/planner";
import { GetAllDestination } from "./../../../../services/https/destination";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import "./../plannerCreate/plannerCreate.css";
import "./plannerCreate.css";
import cruise from "../../../../asset/cruise.png";
import { PlannerInterface } from "../../../../interface/IPlanner";
import { GetAllPortOrigin } from "../../../../services/https/portOrigin";

export default function PlannerCreate() {
  type RangeValue = [Dayjs | null, Dayjs | null] | null;
  const [portOrigin, setPortOrigin] = useState<DestinationInterface[]>([]);
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState<RangeValue>(null);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const getDestination = async () => {
    let res = await GetAllPortOrigin();
    if (res) {
      setPortOrigin(res);
    }
  };
  useEffect(() => {
    getDestination();
  }, []);

  const [input, setInput] = useState({
    DestinationID: 0,
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };

  let navigate = useNavigate();
  const handdleDateChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 1;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 0;
    return !!tooEarly || !!tooLate;
  };
  function range(start: any, end: any) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(0, 8),
    };
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [planName, setPlan_name] = useState("");
  const [price, setPrice] = useState("");
  const [plan_img, setPlan_Img] = useState("");

  const handleSubmit = async (values: PlannerInterface) => {
    values.TimeStart = new Date(StartDate);
    values.TimeEnd = new Date(EndDate);
    values.DestinationID = input.DestinationID;
    values.Plan_name = planName;
    values.Price = Number(price);
    values.Plan_img = plan_img;

    console.log(values);

    let res = await CreatePlanner(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/planner");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setPlan_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };

      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  return (
    <div className="cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      {contextHolder}

      <h1 className="planner-header">Add a trip</h1>

      <div className="planner-headline"></div>

      <div className="create-planner-form">
        <Form onFinish={handleSubmit}>
          <div className="create-planner-form-control">
            <label className="create-planner-text">Name of trip</label>
            <br></br>
            <input
              className="create-planner-input"
              type="text"
              placeholder="Enter name of trip"
              required
              value={planName}
              onChange={(e) => setPlan_name(e.target.value)}
            />
          </div>
          <div className="create-planner-form-control">
            <label className="create-planner-text">destination</label>
            <br></br>
            <div className="create-planner-select">
              <select
                className="create-planner-select-custom"
                name="DestinationID"
                onChange={handleInput}
                required
              >
                <option value="" disabled selected>
                  select destination
                </option>
                {portOrigin.map((item) => (
                  <option value={item.ID} key={item.PortOriginID}>
                    {item.PortOriginID}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="create-planner-form-control">
            <label className="create-planner-text">Destination</label>
            <br></br>
            <div className="create-planner-select">
              <select
                className="create-planner-select-custom"
                name="DestinationID"
                onChange={handleInput}
              >
                <option value="" disabled selected>
                  select port destination
                </option>
                {Destination.map((item) => (
                  <option value={item.ID} key={item.ortOriginID}>
                    {item.port_origin}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="create-planner-form-control">
            <label className="create-planner-text">Price of trip</label>
            <br></br>
            <input
              className="create-planner-input"
              type="number"
              step="0.001"
              placeholder="Enter price of trip"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="create-planner-form-control">
            <label className="create-planner-text">Image of Planner</label>
            <br></br>
            <Upload
              {...props}
              accept="image/png, image/jpeg"
              action="/Planner"
              id="Plan_img"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="create-planner-form-control">
            <label className="create-planner-text">Date and time</label>
            <br></br>
            <RangePicker
              onCalendarChange={(val) => {
                setDates(val);
              }}
              onOpenChange={onOpenChange}
              // disabledDate={disabledDate}
              // disabledTime={disabledDateTime}
              minuteStep={30 as const}
              showTime={{ format: "h:mm A" }}
              format="YYYY-MM-DD"
              onChange={handdleDateChange}
            />
          </div>

          <div className="buttom-area">
            <button type="submit">ยืนยัน</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
