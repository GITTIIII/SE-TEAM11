import  { useEffect, useState } from 'react'
import  "./dessertDashbord.css"
import { Button,  Form, message,  Modal, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteDessertByID, GetAllDessert } from '../../../../../services/https/food/dessert';
import { DessertInterface } from '../../../../../interface/IDessert';



export default function DessertDashbord() {
  const [messageApi, contextHolder] = message.useMessage();
  const [desserts, setDesserts] = useState<DessertInterface[]>([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getDesserts = async () => {

    let res = await GetAllDessert();
    
    if (res) {
    
      setDesserts(res);
    
    }
    
    };
    
    
    useEffect(() => {
    
      getDesserts();
    
    }, []);


    const columns: ColumnsType<DessertInterface> = [
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
    const showModal = (val: DessertInterface) => {
      setModalText(
        `คุณต้องการลบ "${val.Name}" หรือไม่ ?`
      );
      setDeleteId(val.ID);
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      let res = await DeleteDessertByID(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getDesserts();
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
      getDesserts();
    }, []);
    return (
      <>
        {contextHolder}
        <div className='dessertDashbord-bg' style={{ backgroundImage: `url(${ship})` }}>
        <h1 className='dessertDashbord-header'>dessert</h1>
          <div className='dessertDashbord-form'>
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={desserts} />
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
  