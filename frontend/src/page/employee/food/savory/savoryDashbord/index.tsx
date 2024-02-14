import { useEffect, useState } from 'react'
import  "./savoryDashbord.css"
import { Button, ConfigProvider, Form, message,Modal, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { SavoryInterface } from '../../../../../interface/ISavory';
import {  DeleteSavoryByID, GetAllSavory } from '../../../../../services/https/food/savory';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from 'react-router-dom';



export default function SavoryDashbord() {
  const [messageApi, contextHolder] = message.useMessage();
  const [savorys, setSavorys] = useState<SavoryInterface[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getSavorys = async () => {

    let res = await GetAllSavory();
    
    if (res) {
    
      setSavorys(res);
    
    }
    
    };
    
    
    useEffect(() => {
    
      getSavorys();
    
    }, []);


    const columns: ColumnsType<SavoryInterface> = [
        {
          title: "ลำดับ",
          dataIndex: "ID",
          key: "id",
        },
        {
          title: "ชื่อ",
          dataIndex: "Name",
          key: "Name",
        },
        {
          title: "ราคา",
          dataIndex: "Count",
          key: "Count",
        },{
          title: "จัดการ",
          dataIndex: "Manage",
          key: "manage",
          render: (text, record, index) => (
            <>
            <Button  
            onClick={() => navigate(`/employee/food/savory/edit/${record.ID}`)}
            shape="circle" 
            icon={<EditOutlined />} 
            size={"large"} />
              <Button
                onClick={() => showModal(record)}
                style={{ marginLeft: 10 }}
                shape="circle"
                icon = {<DeleteOutlined/>}
                size={"large"}
                danger
              />
            </>
          ),
          
        },
      ];
    const showModal = (val: SavoryInterface) => {
      setModalText(
        `คุณต้องการลบ "${val.Name}" หรือไม่ ?`
      );
      setDeleteId(val.ID);
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      let res = await DeleteSavoryByID(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getSavorys();
      } else {
        setOpen(false);
        messageApi.open({
          type: "error",
          content: "มีข้อมูลอยู่ในFoodSet",
        });
      }
      setConfirmLoading(false);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      getSavorys();
    }, []);
    return (
      <>
        {contextHolder}
        <div className='savoryDashbord-bg' style={{ background : "#eceef2"}}>
        <h1 className='savoryDashbord-header'>ของคาว</h1>
        <div className='savoryDashbord-headline'/>
        <NavLink to="/employee/food/savory/create">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4f95e9",
              colorTextLightSolid: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              colorPrimaryHover: "#89CFF3",
              colorPrimaryActive: "#818FB4",
            },
          }}
        >
          <Button className="foodSetDasdbord-add-button" type="primary">
            เพิ่มของคาว
          </Button>
        </ConfigProvider>
      </NavLink>

            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={savorys} style={{ padding: "20px"}}/>
              </div>
            </Form>
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
      </>
    )
  }
  