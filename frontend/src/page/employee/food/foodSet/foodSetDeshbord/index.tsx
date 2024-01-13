import  { useEffect, useState } from 'react'
import  "./foodSetDashbord.css"
import { Button, Form, message,  Input, InputNumber, Modal, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { SavoryInterface } from '../../../../../interface/ISavory';
import Table, { ColumnsType } from 'antd/es/table';
import { FoodSetInterface } from '../../../../../interface/IFoodSet';
import { DeleteFoodSetByID, GetAllFoodSet } from '../../../../../services/https/food/foodSet';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


export default function FoodSetDashbord() {
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
        <div className='foodSetDashbord-bg' style={{ backgroundImage: `url(${ship})` }}>
          <div className='foodSetDashbord-header'>
            <h1>FoodSet</h1>
          </div>
          <div className="foodSet-headline" />
          
      {/* <NavLink to="/employee/room/create">
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
      </NavLink> */}
          {/* <div className='foodSetDashbord-form'> */}
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={FoodSets} />
              </div>
            </Form>
          </div>     
        {/* </div> */}
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
  