import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";
import "./room.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Image, Popover } from "antd";


import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


import { GetAllRoom, DeleteRoomByID } from "../../../services/https/room";
import { RoomInterface } from "../../../interface/IRoom";
import { RoomZoneInterface } from "../../../interface/IRoomZone";
import { RoomTypeInterface } from "../../../interface/IRoomType";
import EditRoom from "./editRoom";

export const roomIDContext = createContext(0);

export default function Room() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listRoom, setAllRoom] = useState<RoomInterface[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomID, setSelectedRoomID] = useState<number>(0);

  const getAllRoom = async () => {
    let res = await GetAllRoom();
    if (res) {
      setAllRoom(res);
    }
  };

  const handleDelete = async (id: Number | undefined) => {
    let res = await await DeleteRoomByID(id);
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
  const filteredRoom = listRoom.filter(
    (listRoom) => listRoom.EmployeeID === employeeIdAsNumber
  );

  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 3;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredRoom.slice(startIndex, endIndex);

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
  console.log(selectedRoomID);

  useEffect(() => {
    getAllRoom();
  }, []);

  return (
    <>
      <roomIDContext.Provider value={selectedRoomID}>
        {contextHolder}
        <div className="room-table-show">
          <h1 className="room-text-home">ห้องพัก</h1>
          <hr />
          <div>
            <Link to="create">
              <div className="room-request-button">เพิ่มห้องพัก</div>
            </Link>
            <div className="room-table">
              <table className="room-content-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>หมายเลขห้องพัก</th>
                    <th>รูปภาพ</th>
                    <th>ประเภท</th>
                    <th>โซนที่ตั้ง</th>
                    <th>ราคา</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((item, index) => (
                    <tr key={index}>
                      <td>{index + startIndex + 1}</td>
                      <td>{item.Room_number}</td>
                      <td>
                        <Image src={`${item.Room_img}`}></Image>
                      </td>
                      <td>
                        {(item.RoomType as RoomTypeInterface)?.RoomType_name}
                      </td>
                      <td>
                        {(item.RoomZone as RoomZoneInterface)?.RoomZone_name}
                      </td>
                      <td>{item.Room_price}</td>
                      <td>
                        <Popconfirm
                          title="ลบห้องพัก"
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
                                setSelectedRoomID(item.ID);
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
              <div className="room-paging">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="room-paging-backward"
                >
                  <IoIosArrowBack />
                </button>
                <span className="room-current-page">{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= listRoom.length}
                  className="room-paging-forward"
                >
                  <IoIosArrowForward />
                </button>
              </div>
              {showEdit && (
                <div className="updatePopup">
                  <div className="update-form">
                    <EditRoom onCancel={handleCancel} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </roomIDContext.Provider>
    </>
  );
}
