import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RoomInterface } from "../../../interface/IRoom";
import "./room.css";
import { Button, ConfigProvider, Table, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import cruise from "../../../asset/cruise.png";
import { GetAllRoom } from "../../../services/https/room";
import { DeleteRoomByID } from "../../../services/https/room";
import { useNavigate, useParams } from "react-router-dom";

export default function Room() {
  const navigate = useNavigate();
  const columns: ColumnsType<RoomInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูปห้องพัก",
      dataIndex: "Room_img",
      key: "room_img",
      render: (text, record, index) => (
        <img
          src={record.Room_img}
          className=""
          width="100px"
          height="100px"
          style={{ objectFit: "cover" }}
          alt=""
        />
      ),
    },
    {
      title: "เลขห้องพัก",
      dataIndex: "Room_number",
      key: "room_number",
    },
    {
      title: "ประเภท",
      dataIndex: "RoomType",
      key: "room_type",
      render: (item) => Object.values(item.RoomType_name),
    },
    {
      title: "โซนที่ตั้ง",
      dataIndex: "RoomZone",
      key: "room_zone",
      render: (item) => Object.values(item.RoomZone_name),
    },
    {
      title: "ราคา",
      dataIndex: "Room_price",
      key: "room_price",
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/employee/room/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const [listRoom, setAllRoom] = useState<RoomInterface[]>([]);

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getAllRoom = async () => {
    let res = await GetAllRoom();
    if (res) {
      setAllRoom(res);
    }
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  const showModal = (val: RoomInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลห้องพักหมายเลข "${val.Room_number}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteRoomByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAllRoom();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      {contextHolder}
      <h1 className="room-header">Room</h1>

      <div className="room-headline" />

      <NavLink to="/employee/room/create">
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
          <Button className="room-add-button" type="primary">
            add a room
          </Button>
        </ConfigProvider>
      </NavLink>

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={listRoom}
          style={{ padding: "20px", boxShadow: "" }}
        />
      </div>
      <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
