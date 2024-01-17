import  { useEffect, useState } from 'react'
import  "./foodSetDashbord.css"
import { Button, Form, message,  Input, InputNumber, Modal, ConfigProvider, } from 'antd';

import cruise from "../../../../../asset/cruise.png";

import { SavoryInterface } from '../../../../../interface/ISavory';
import Table, { ColumnsType } from 'antd/es/table';
import { FoodSetInterface } from '../../../../../interface/IFoodSet';
import { DeleteFoodSetByID, GetAllFoodSet } from '../../../../../services/https/food/foodSet';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useNavigate} from 'react-router-dom';


export default function FoodSetDashbord() {
  const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [IdFoodSets,setIdFoodSets] =  useState<number[]>([]);
  const [FoodSets, setFoodSets] = useState<FoodSetInterface[]>([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();


  const getFoodSets = async () => {
    let res = await GetAllFoodSet();
    if (res) {
      setFoodSets(res);
    }
  };
  useEffect(() => {
    getFoodSets();
  }, []);
  
  const getIdFoodSets = async () => {
    let res = await GetAllFoodSet();
    if (res) {
      setIdFoodSets(res.ID);
    }
  };
  useEffect(() => {
    getIdFoodSets();
  }, []);
  


    const columns: ColumnsType<FoodSetInterface> = [
        {
          title: "ลำดับ",
          dataIndex: "ID",
          key: "ID",
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
        },
        {
          title: "ของคาว",
          dataIndex: "Savory",
          key: "Savory",
          render: (item) => Object.values(item.Name),
        },
        {
          title: "เครื่องดื่ม",
          dataIndex: "Drink",
          key: "Drink",
          render: (item) => Object.values(item.Name),
        },
        {
            title: "ของหวาน",
            dataIndex: "Dessert",
            key: "Dessert",
            render: (item) => Object.values(item.Name),

          },
          {
            title: "จัดการ",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
              <>
              <Button  
              onClick={() => navigate(`/employee/food/edit/${record.ID}`)}
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
          `คุณต้องการลบข้อมูลผู้ใช้ "${val.Name}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
      };
    
      const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteFoodSetByID(deleteId);
        if (res) {
          setOpen(false);
          messageApi.open({
            type: "success",
            content: "ลบข้อมูลสำเร็จ",
          });
          getFoodSets();
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
        getFoodSets();
      }, []);
    return (
      <>
        {contextHolder}
        <div className='cruise-bg' style={{ backgroundImage: `url(${cruise})` }}>
        <div className='header' style={{display:"flex",alignItems:"center"}}>
          <h1 className='foodSetDashbord-header'>FoodSet</h1>

      <div className='foodSetDasdbord-add-button'>
          <NavLink to="/employee/food/Savory">
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
          <Button  type="primary">
            Savory
          </Button>
        </ConfigProvider>
      </NavLink>
      </div>
      <div className='foodSetDasdbord-add-button'>
          <NavLink to="/employee/food/Dessert">
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
          <Button  type="primary">
            dessert
          </Button>
        </ConfigProvider>
      </NavLink>
      </div>
      <div className='foodSetDasdbord-drink-button'>
          <NavLink to="/employee/food/Drink">
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
          <Button  type="primary">
             drink 
          </Button>
        </ConfigProvider>
      </NavLink>
      </div>
      </div>


          <div className="foodSetDashbord-headline" />
          <NavLink to="/employee/food/create">
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
            add a foodSet
          </Button>
        </ConfigProvider>
      </NavLink>

              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={FoodSets} style={{ padding: "20px", boxShadow: "" }}/>
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
  