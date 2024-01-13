import { useEffect, useState } from 'react'
import  "./savoryDashbord.css"
import { Button, Form, message,Modal, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { SavoryInterface } from '../../../../../interface/ISavory';
import {  DeleteSavoryByID, GetAllSavory } from '../../../../../services/https/food/savory';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";



export default function SavoryDashbord() {
  const [messageApi, contextHolder] = message.useMessage();
  const [savorys, setSavorys] = useState<SavoryInterface[]>([]);

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
            // onClick={() =>  navigate(`/customer/edit/${record.ID}`)} 
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
          content: "เกิดข้อผิดพลาด !",
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
        <div className='savoryDashbord-bg' style={{ backgroundImage: `url(${ship})` }}>
        <h1 className='savoryDashbord-header'>savory</h1>
          <div className='savoryDashbord-form'>
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={savorys} />
              </div>
            </Form>
          </div>     
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
  