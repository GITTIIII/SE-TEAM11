import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

import "./planner.css";
import { Button, message, Image, Popconfirm, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PlannerInterface } from "../../../interface/IPlanner";

import { GetAllPlanner } from "../../../services/https/planner";
import { DeletePlannerByID } from "../../../services/https/planner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DestinationInterface } from "../../../interface/IDestination";
import { QuayInterface } from "../../../interface/IQuay";
import PlannerEdit from "./plannerEdit";
import planetBG from "../../../asset/planetBG.png";
export const plannerIDContext = createContext(0);
export default function Destination() {
  const [showEdit, setShowEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [listPlanner, setAllPlanner] = useState<PlannerInterface[]>([]);
  // const [showEdit, setShowEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlannerID, setSelectedPlannerID] = useState<number>(0);

  const getAllPlanner = async () => {
    let res = await GetAllPlanner();
    if (res) {
      setAllPlanner(res);
    }
  };

  useEffect(() => {
    getAllPlanner();
  }, []);
  console.log(listPlanner);
  const handleDelete = async (id: Number | undefined) => {
    let res = await await DeletePlannerByID(id);
    if (res) {
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 500);
    } else {
      messageApi.open({
        type: "error",
        content: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };

  const handleCancel = () => {
    setShowEdit(!showEdit);
  };

  const employeeIdFromLocalStorage = localStorage.getItem("EmployeeID");
  const employeeIdAsNumber = employeeIdFromLocalStorage
    ? parseInt(employeeIdFromLocalStorage, 10)
    : undefined;

  // Filter repairRequest based on memberId
  const filteredPlanner = listPlanner.filter(
    (listPlanner) => listPlanner.EmployeeID === employeeIdAsNumber
  );

  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 3;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredPlanner.slice(startIndex, endIndex);

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const DeletePopOver = (
    <div>
      <p>ลบข้อมูล</p>
    </div>
  );

  const EditPopOver = (
    <div>
      <p>แก้ไขข้อมูล</p>
    </div>
  );

  console.log(showEdit);
  console.log(visibleRows);
  console.log(filteredPlanner);
  console.log(listPlanner);

  return (
    <>
      <plannerIDContext.Provider value={selectedPlannerID}>
        <div
          className="planner-cruise-bg"
          style={{ backgroundImage: `url(${planetBG})` }}
        >
          {contextHolder}

          <div className="planner-table-show">
            <h1 className="planner-text-home">ทริป</h1>
            <hr />

            <div>
              <Link to="create">
                <div className="planner-request-button">เพิ่มทริป</div>
              </Link>

              <div className="planner-table">
                <table className="planner-content-table">
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <th>รูปภาพ</th>
                      <th>ชื่อทริป</th>
                      <th>จาก - ถึง</th>
                      <th>ชานชาลา</th>
                      <th>ราคา</th>
                      <th>วันที่</th>
                      <th>สถานะ</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((item, index) => (
                      <tr key={index}>
                        <td>{index + startIndex + 1}</td>
                        <td>
                          <Image
                            src={`${item.Plan_img}`}
                            // width="100px"
                            // height="100px"
                          ></Image>
                        </td>
                        <td>{item.Plan_name}</td>
                        <td>
                          {
                            (item.Destination as DestinationInterface)
                              ?.Destination_name
                          }
                        </td>
                        <td>{item.Quay?.Quay_number}</td>
                        <td>{item.Plan_price}</td>
                        <td>
                          {" "}
                          <label>วันเดินเรือ :</label>{" "}
                          {new Intl.DateTimeFormat("th-TH", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }).format(new Date(item.TimeStart!))}
                        </td>
                        <td>
                          <p
                            className={
                              Object(item.Planner_status) == "กำลังออกเรือ"
                                ? `green`
                                : `red`
                            }
                          >
                            {item.Planner_status}
                          </p>
                        </td>
                        <td>
                          <Popconfirm
                            title="ลบจุดหมาย"
                            description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย?"
                            onConfirm={() => handleDelete(item.ID)}
                            onCancel={() => cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Popover content={DeletePopOver}>
                              <Button icon={<DeleteOutlined />}></Button>
                            </Popover>
                          </Popconfirm>
                          <Popover content={EditPopOver}>
                            <Button
                              icon={<EditOutlined />}
                              onClick={() => {
                                if (item.ID !== undefined) {
                                  setSelectedPlannerID(item.ID);
                                  setShowEdit(!showEdit);
                                }
                              }}
                            ></Button>
                          </Popover>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="planner-paging">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="planner-paging-backward"
                  >
                    <IoIosArrowBack />
                  </button>
                  <span className="planner-current-page">{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= listPlanner.length}
                    className="planner-paging-forward"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                {showEdit && (
                  <div className="destination-updatePopup">
                    <div className="destination-update-form">
                      <PlannerEdit onCancel={handleCancel} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </plannerIDContext.Provider>
    </>
  );
}
