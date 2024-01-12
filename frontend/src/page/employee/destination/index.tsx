import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./destination.css";
import { Button, ConfigProvider, Modal, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import cruise from "../../../asset/cruise.png";
import { DestinationInterface } from "../../../interface/IDestination";
import {
  DeleteDestinationByID,
  GetAllDestination,
} from "../../../services/https/destination";
import { ColumnsType } from "antd/es/table";

export default function Destination() {
  const navigate = useNavigate();
  const columns: ColumnsType<DestinationInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ต้นทาง",
      dataIndex: "PortOrigin",
      key: "port_origin",
      render: (item) => item.PortOrigin_name,
    },
    {
      title: "ปลายทาง",
      dataIndex: "PortDestination",
      key: "port_destination",
      render: (item) => item.PortDestination_name,
    },
    {
      title: "ระยะทาง (ไมล์)",
      dataIndex: "Distance",
      key: "distance",
      render: (item) => item.Distance,
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/employee/destination/edit/${record.ID}`)}
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
  const [listDestination, setAllDestination] = useState<DestinationInterface[]>(
    []
  );

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getAllDestination = async () => {
    let res = await GetAllDestination();
    if (res) {
      setAllDestination(res);
    }
  };

  useEffect(() => {
    getAllDestination();
  }, []);

  const showModal = (val: DestinationInterface) => {
    setModalText(`คุณต้องการลบข้อมูลจุดหมายหรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteDestinationByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAllDestination();
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
      <h1 className="destination-header">Destination</h1>

      <div className="destination-headline" />

      <NavLink to="/employee/destination/create">
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
          <Button className="destination-add-button" type="primary">
            add a destination
          </Button>
        </ConfigProvider>
      </NavLink>
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={listDestination}
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
