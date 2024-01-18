import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./planner.css";
import { Button, ConfigProvider, Modal, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import cruise from "../../../asset/cruise.png";
import { PlannerInterface } from "../../../interface/IPlanner";
import {
  DeletePlannerByID,
  GetAllPlanner,
} from "../../../services/https/planner";
import { ColumnsType } from "antd/es/table";

export default function Destination() {
  const navigate = useNavigate();
  const columns: ColumnsType<PlannerInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ทริป",
      dataIndex: "Plan_img",
      key: "plan_img",
      render: (text, record, index) => (
        <img
          src={`${record.Plan_img}`}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
          alt={`Trip ${index + 1}`}
        />
      ),
    },
    {
      title: "ชื่อทริป",
      dataIndex: "Plan_name",
      key: "plan_name",
    },
    // {
    //   title: "ระยะทาง (ไมล์)",
    //   dataIndex: "Distance",
    //   key: "distance",
    //   render: (item) => item.Destination_name,
    // },
    {
      title: "จุดหมาย",
      dataIndex: "DestinationID",
      key: "destinationid",
      render: (item) => item.PortOrin_name,
    },
    {
      title: "ราคา",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "วันเดินทาง",
      dataIndex: "TimeStart",
      key: "timestart",
    },
    {
      title: "ถึง",
      dataIndex: "TimeEnd",
      key: "timeend",
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
  const [listPlanner, setAllPlanner] = useState<PlannerInterface[]>([]);

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getAllPlanner = async () => {
    let res = await GetAllPlanner();
    if (res) {
      setAllPlanner(res);
    }
  };

  useEffect(() => {
    getAllPlanner();
  }, []);

  const showModal = (val: PlannerInterface) => {
    setModalText(`คุณต้องการลบข้อมูลจุดหมายหรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeletePlannerByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAllPlanner();
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
      <h1 className="planner-header">Planner</h1>

      <div className="planner-headline" />

      <NavLink to="/employee/planner/create">
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
          <Button className="planner-add-button" type="primary">
            add a planner
          </Button>
        </ConfigProvider>
      </NavLink>
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={listPlanner}
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
