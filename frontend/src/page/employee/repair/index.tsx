import React, { useEffect, useState, createContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./repair.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, ConfigProvider, Popconfirm } from "antd";

import { IoIosArrowBack, IoIosArrowForward, IoMdClose,IoMdAdd } from "react-icons/io";

import { GetAllRepair, DeleteRepairByID } from "../../../services/https/repair";
import { RepairInterface } from "../../../interface/IRepair";
import { RepairTypeInterface } from "../../../interface/IRepairType";
import RepairEdit from "./repairEdit";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomInterface } from "../../../interface/IRoom";

export const repairIDContext = createContext(0);

export default function Repair() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listRepair, setAllRepair] = useState<RepairInterface[]>([]);
  const [showEdit, setShowEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRepairID, setSelectedRepairID] = useState<number>(0);

  const getAllRepair = async () => {
    let res = await GetAllRepair();
    if (res) {
      setAllRepair(res);
    }
  };

  useEffect(() => {
    getAllRepair();
  }, []);

  const handleDelete = async (id: Number | undefined) => {
    let res = await await DeleteRepairByID(id);
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

  const employeeIdFromLocalStorage = localStorage.getItem("EmployeeID");
  const employeeIdAsNumber = employeeIdFromLocalStorage
    ? parseInt(employeeIdFromLocalStorage, 10)
    : undefined;

  // Filter repairRequest based on memberId
  const filteredRepairRequest = listRepair.filter(
    (listRepair) => listRepair.EmployeeID === employeeIdAsNumber
  );

  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 3;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredRepairRequest.slice(startIndex, endIndex);


  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  

  console.log(showEdit);
  console.log(selectedRepairID);

  return (
    <>
      <repairIDContext.Provider value={selectedRepairID}>
        {/* <div className="login-bg" style={{ backgroundImage: `url(${background})` }}> */}
        {contextHolder}

        <div className="repair-table-show">
          <h1 className="repair-text-home">แจ้งซ่อมห้องพัก</h1>
          <hr />

          <div>
            <Link to="create">
              
              <div className="repair-request-button">สร้างคำขอการแจ้งซ่อม</div>
            </Link>

            <div className="repair-table">
              <table className="repair-content-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ห้องพัก</th>
                    <th>รูปภาพ</th>
                    <th>ประเภท</th>
                    <th>รายละเอียด</th>
                    <th>วันที่ต้องการรับบริการ</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((item, index) => (
                    <tr key={index}>
                      <td>{item.ID}</td>
                      <td>{(item.Room as RoomInterface)?.Room_number}</td>
                      <td>
                        <img src={`${item.Repair_img}`}></img>
                      </td>
                      <td>
                        {(item.RepairType as RepairTypeInterface)?.Repair_name}
                      </td>
                      <td>{item.Comment}</td>
                      <td>{new Date(item.Repair_date!).toLocaleDateString()}</td>
                      <td >
                        <p className={Object(item.Repair_status) == "เสร็จสิ้น" ? `green` : `red`}>{item.Repair_status}</p>
                      </td>
                      <td>
                        <Popconfirm
                          title="ลบรายการของการแจ้งซ่อม"
                          description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย?"
                          onConfirm={() => handleDelete(item.ID)}
                          onCancel={() => cancel}

                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            
                          ></Button>
                        </Popconfirm>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            if (item.ID !== undefined) {
                              setSelectedRepairID(item.ID);
                              setShowEdit(!showEdit);
                            }
                          }}
                        ></Button>
                      </td>
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
                  disabled={endIndex >= listRepair.length}
                  className="repair-paging-forward"
                >
                  <IoIosArrowForward />
                </button>
              </div>
              {showEdit && (
                <div className="repair-update-button">
                  <div
                    className="repair-update-button-icon"
                    onClick={() => setShowEdit(!showEdit)}
                  >
                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                  </div>
                  <RepairEdit />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* </div> */}
      </repairIDContext.Provider>
    </>
  );
}
