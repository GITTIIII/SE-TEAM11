import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

import "./destination.css";
import { Button, message, Image, Popconfirm, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DestinationInterface } from "../../../interface/IDestination";
import {
  DeleteDestinationByID,
  GetAllDestination,
} from "../../../services/https/destination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DestinationEdit from "./destinationEdit";
import { PortDestinationInterface } from "../../../interface/IPortDestination";
import { PortOriginInterface } from "../../../interface/IPortOrigin";
import { DistanceInterface } from "../../../interface/IDistance";
import planetBG from "../../../asset/planetBG.png";
export const destinationIDContext = createContext(0);
export default function Destination() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listDestination, setAllDestination] = useState<DestinationInterface[]>(
    []
  );
  const [showEdit, setShowEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestinationID, setSelectedDestinationID] = useState<number>(0);

  const getAllDestination = async () => {
    let res = await GetAllDestination();
    if (res) {
      setAllDestination(res);
    }
  };

  useEffect(() => {
    getAllDestination();
  }, []);
  console.log(listDestination);
  const handleDelete = async (id: Number | undefined) => {
    let res = await await DeleteDestinationByID(id);
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
  const filteredDestination = listDestination.filter(
    (listDestination) => listDestination.EmployeeID === employeeIdAsNumber
  );

  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredDestination.slice(startIndex, endIndex);

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
  console.log(selectedDestinationID);
  console.log(visibleRows);
  console.log(filteredDestination);
  console.log(listDestination);

  return (
    <>
      <destinationIDContext.Provider value={selectedDestinationID}>
        <div
          className="destination-cruise-bg"
          style={{ backgroundImage: `url(${planetBG})` }}
        >
          {contextHolder}

          <div className="destination-table-show">
            <h1 className="destination-text-home">จุดหมาย</h1>
            <hr />

            <div>
              <Link to="create">
                <div className="destination-request-button">เพิ่มจุดหมาย</div>
              </Link>

              <div className="destination-table">
                <table className="destination-content-table">
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <th>ต้นทาง - ปลายทาง</th>
                      <th>ท่าเรือต้นทาง</th>
                      <th>ท่าเรือปลายทาง</th>
                      <th>ระยะทาง (ประมาณและเป็นไมล์)</th>
                      <th>หมายเหตุ</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((item, index) => (
                      <tr key={index}>
                        <td>{index + startIndex + 1}</td>
                        <td>{item.Destination_name}</td>
                        <td>
                          {
                            (item.PortOrigin as PortOriginInterface)
                              ?.PortOrigin_name
                          }
                        </td>
                        <td>
                          {
                            (item.PortDestination as PortDestinationInterface)
                              ?.PortDestination_name
                          }
                        </td>
                        <td>
                          {(item.Distance as DistanceInterface)?.Distance}
                        </td>
                        <td>{item.Comment}</td>
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
                                  setSelectedDestinationID(item.ID);
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
                <div className="destination-paging">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="destination-paging-backward"
                  >
                    <IoIosArrowBack />
                  </button>
                  <span className="destination-current-page">
                    {currentPage}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= listDestination.length}
                    className="destination-paging-forward"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
                {showEdit && (
                  <div className="destination-updatePopup">
                    <div className="destination-update-form">
                      <DestinationEdit onCancel={handleCancel} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </destinationIDContext.Provider>
    </>
  );
}
