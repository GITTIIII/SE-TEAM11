import  { useEffect, useState } from 'react'
import  "./drinkDashbord.css"
import { Button, Form, message,  Modal, } from 'antd';
import ship from "../../../../../asset/ship.jpg"
import { DrinkInterface } from '../../../../../interface/IDrink';
import { DeleteDrinkByID, GetAllDrink } from '../../../../../services/https/food/drink';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";



export default function DrinkDashbord() {
  const [messageApi, contextHolder] = message.useMessage();
  const [drinks, setDrinks] = useState<DrinkInterface[]>([]);

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
          content: "เกิดข้อผิดพลาด !",
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
        <div className='drinkDashbord-bg' style={{ backgroundImage: `url(${ship})` }}>
        <h1 className='drinkDashbord-header'>drink</h1>
          <div className='drinkDashbord-form'>
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={drinks} />
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
  