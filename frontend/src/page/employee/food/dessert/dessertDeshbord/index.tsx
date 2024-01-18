import  { useEffect, useState } from 'react'
import  "./dessertDashbord.css"
import { Button,  ConfigProvider,  Form, message,  Modal, } from 'antd';
import cruise from "../../../../../asset/cruise.png";
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteDessertByID, GetAllDessert } from '../../../../../services/https/food/dessert';
import { DessertInterface } from '../../../../../interface/IDessert';
import { NavLink, useNavigate } from 'react-router-dom';



export default function DessertDashbord() {
  const navigate = useNavigate();
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
             onClick={() => navigate(`/employee/food/dessert/edit/${record.ID}`)}
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
          content: "มีข้อมูลอยู่ในFoodSet",
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
        <div className='cruise-bg' style={{ backgroundImage: `url(${cruise})` }}>
        <h1 className='dessertDashbord-header'>Dessert</h1>
        <div className='dessertDashbord-headline'/>
        <NavLink to="/employee/food/dessert/create">
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
          <Button className="foodSetDasdbord-add-button" type="primary">
            add a dessert
          </Button>
        </ConfigProvider>
      </NavLink>

            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={desserts} style={{ padding: "20px", boxShadow: "" }}/>
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
  