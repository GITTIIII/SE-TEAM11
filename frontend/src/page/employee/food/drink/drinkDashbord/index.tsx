import  { useEffect, useState } from 'react'
import  "./drinkDashbord.css"
import { Button, ConfigProvider, Form, message,  Modal, } from 'antd';
import cruise from "../../../../../asset/cruise.png"
import { DrinkInterface } from '../../../../../interface/IDrink';
import { DeleteDrinkByID, GetAllDrink } from '../../../../../services/https/food/drink';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from 'react-router-dom';



export default function DrinkDashbord() {
  const [messageApi, contextHolder] = message.useMessage();
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getDrinks = async () => {

    let res = await GetAllDrink();
    
    if (res) {
    
      setDrinks(res);
    
    }
    
    };
    
    
    useEffect(() => {
    
      getDrinks();
    
    }, []);


    const columns: ColumnsType<DrinkInterface> = [
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
             onClick={() => navigate(`/employee/food/drink/edit/${record.ID}`)}
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
    const showModal = (val: DrinkInterface) => {
      setModalText(
        `คุณต้องการลบ "${val.Name}" หรือไม่ ?`
      );
      setDeleteId(val.ID);
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      let res = await DeleteDrinkByID(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getDrinks();
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
      getDrinks();
    }, []);
    return (
      <>
        {contextHolder}
        <div className='drinkDashbord-bg' style={{ background : "#eceef2"}}>
        <h1 className='drinkDashbord-header'>เครื่องดื่ม</h1>
      <div className='drinkDashbord-headline'/>
      <NavLink to="/employee/food/drink/create">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4f95e9",
              colorTextBase: "#ffffff",
              colorTextLightSolid: "#ffffff",
              colorPrimaryHover: "#89CFF3",
              colorPrimaryActive: "#818FB4",
            },
          }}
        >
          <Button className="foodSetDasdbord-add-button" type="primary">
            เพิ่มเครื่องดื่ม
          </Button>
        </ConfigProvider>
      </NavLink>
          
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={drinks} style={{ padding: "20px", boxShadow: "" }}/>
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
  