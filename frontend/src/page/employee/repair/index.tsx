import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./repair.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, ConfigProvider, Table, Modal } from "antd";

import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

import { GetAllRepair, DeleteRepairByID } from "../../../services/https/repair";
import { RepairInterface } from "../../../interface/IRepair";
import { RepairTypeInterface } from "../../../interface/IRepairType";



import RepairEdit from "./repairEdit";

export default function Repair() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listRepair, setAllRepair] = useState<RepairInterface[]>([]);
  const [showEdit, setShowEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

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

  const handleClose = () => setShowEdit(false);

  console.log(showEdit);

  return (
    <>
      <RepairEdit open={showEdit} onClose={handleClose}></RepairEdit>
      {/* <div className="login-bg" style={{ backgroundImage: `url(${background})` }}> */}
      {contextHolder}
      <div className="repair-table-show">
        <h1 className="repair-text-home">Repair</h1>
        <div>
          <div>
            <NavLink to="/employee/repair/create">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#CDF5FD",
                    colorTextLightSolid: "#000000",
                    colorPrimaryHover: "#89CFF3",
                    colorPrimaryActive: "#818FB4",
                  },
                }}
              >
                <Button className="repair-request-button" type="primary">
                  Repair Request
                </Button>
              </ConfigProvider>
            </NavLink>
          </div>
          <div className="repair-table">
            <table className="repair-content-table">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Problem</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${item.Repair_img}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      ></img>
                    </td>
                    <td>
                      {(item.RepairType as RepairTypeInterface)?.Repair_name}
                    </td>
                    <td>{item.Comment}</td>
                    <td>{new Date(item.Repair_date!).toLocaleString()}</td>
                    <td>{item.Repair_status}</td>
                    <td>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(item.ID)}
                      ></Button>
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => setShowEdit(true)}
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
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
