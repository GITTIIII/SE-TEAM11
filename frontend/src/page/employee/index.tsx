// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { EmployeeInterface } from "../../interface/IEmployee";
// import "./employee.css";
// import { Button, ConfigProvider, Table, message, Modal } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { ColumnsType } from "antd/es/table";
// import cruise from "../../asset/cruise.png";
// import { GetAllEmployee } from "../../services/https/employee";
// import { DeleteEmployeeByID } from "../../services/https/employee";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EmployeeManagement() {
//   const navigate = useNavigate();
//   const columns: ColumnsType<EmployeeInterface> = [
//     {
//       title: "ลำดับ",
//       dataIndex: "ID",
//       key: "id",
//     },
//     {
//       title: "ชื่อ",
//       dataIndex: "Name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//       key: "email",
//     },
//     {
//       title: "AreaCode",
//       dataIndex: "AreaCode",
//       key: "areacode",
//       render: (item) => item.Name,
//     },
//     {
//       title: "Phone",
//       dataIndex: "Tel",
//       key: "tel",
//     },
//     {
//       title: "Sex",
//       dataIndex: "Gender",
//       key: "gender",
//       render: (item) => item.Name,
//     },

//     {
//       title: "จัดการ",
//       dataIndex: "Manage",
//       key: "manage",
//       render: (text, record, index) => (
//         <>
//           <Button
//             onClick={() => navigate(`/employee/employeeManagement/employeeUpdate/${record.ID}`)}
//             shape="circle"
//             icon={<EditOutlined />}
//             size={"large"}
//           />
//           <Button
//             onClick={() => showModal(record)}
//             style={{ marginLeft: 10 }}
//             shape="circle"
//             icon={<DeleteOutlined />}
//             size={"large"}
//             danger
//           />
//         </>
//       ),
//     },
//   ]

//   const [messageApi, contextHolder] = message.useMessage();
//   const [listEmployee, setAllEmployee] = useState<EmployeeInterface[]>([]);

//   // Model
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState<String>();
//   const [deleteId, setDeleteId] = useState<Number>();

//   const getAllEmployee = async () => {
//     let res = await GetAllEmployee();
//     if (res) {
//       setAllEmployee(res);
//     }
//   };

//   useEffect(() => {
//     getAllEmployee();
//   }, []);

//   const showModal = (val: EmployeeInterface) => {
//     setModalText(
//       `คุณต้องการลบข้อมูลของ"${val.Name}" หรือไม่ ?`
//     );
//     setDeleteId(val.ID);
//     setOpen(true);
//   };

//   const handleOk = async () => {
//     setConfirmLoading(true);
//     let res = await DeleteEmployeeByID(deleteId);
//     if (res) {
//       setOpen(false);
//       messageApi.open({
//         type: "success",
//         content: "ลบข้อมูลสำเร็จ",
//       });
//       getAllEmployee();
//     } else {
//       setOpen(false);
//       messageApi.open({
//         type: "error",
//         content: "เกิดข้อผิดพลาด !",
//       });
//     }
//     setConfirmLoading(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   return (


//     <div className="cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
//       {contextHolder}
//       <h1 className="employee-header">Employee Management Center</h1>

//       <div className="employee-headline" />

//       <NavLink to="/employee/employeeManagement/employeeCreate">
//         <ConfigProvider
//           theme={{
//             token: {
//               colorPrimary: "#CDF5FD",
//               colorTextLightSolid: "#000000",
//               colorPrimaryHover: "#89CFF3",
//               colorPrimaryActive: "#818FB4",
//             },
//           }}
//         >
//           <Button className="employee-add-button" type="primary">
//             Add Employee
//           </Button>
//         </ConfigProvider>
//       </NavLink>

//       <div style={{ marginTop: 20 }}>
//         <Table
//           rowKey="ID"
//           columns={columns}
//           dataSource={listEmployee}
//           style={{ padding: "20px", boxShadow: "" }}
//         />
//       </div>
//       <Modal
//         title="ลบข้อมูล ?"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <p>{modalText}</p>
//       </Modal>
//     </div>
//   );


// }

import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";
import "./employee.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Image, Popover } from "antd";


import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


import { GetAllEmployee, DeleteEmployeeByID } from "../../services/https/employee";
import { EmployeeInterface } from "../../interface/IEmployee";
import { AreaCodesInterface } from "../../interface/IAreaCode";
import { GendersInterface } from "../../interface/IGender";
import { EmployeeRoleInterface } from "../../interface/IEmployeeRole";
import EditEmployee from "./employeeUpdate";

export const employeeIDContext = createContext(0);

export default function EmployeeManagement() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listEmployee, setAllEmployee] = useState<EmployeeInterface[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number>(0);

  const getAllEmployee = async () => {
    let res = await GetAllEmployee();
    if (res) {
      setAllEmployee(res);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);


  const handleDelete = async (id: Number | undefined) => {
    let res = await await DeleteEmployeeByID(id);
    if (res) {
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 500);
    } else {
      messageApi.open({
        type: "error",
        content: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  };

  const handleCancel = () => {
    setShowEdit(!showEdit);
  };

  const employeeIdFromLocalStorage = localStorage.getItem("EmployeeID");
  const employeeIdAsNumber = employeeIdFromLocalStorage
    ? parseInt(employeeIdFromLocalStorage, 10)
    : undefined;

  // เลือกหน้า =----------------------------------------------------------------------------------------------------------------------------------------
  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = listEmployee.slice(startIndex, endIndex);

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const DeletePopOver = (
    <div>
      <p>ลบข้อมูล</p>
    </div>
  );

  const EditPopOver = (
    <div>
      <p>แก้ไขข้อมูล</p>
    </div>
  );

  console.log(showEdit);
  console.log(selectedEmployeeID);

  return (
    <>
      <employeeIDContext.Provider value={selectedEmployeeID}>
        {contextHolder}

        <div className="employee-table-show">
          <h1 className="employee-text-home">จัดการลูกเรือ</h1>
          <hr />

          <div>
            <Link to="/employee/employeeCreate">
              <div className="employee-request-button">เพิ่มลูกเรือ</div>
            </Link>

            <div className="employee-table">
              <table className="employee-content-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>หมายเลขลูกเรือ</th>
                    <th>รูปภาพ</th>
                    <th>อีเมลล์</th>
                    <th>ตำแหน่ง</th>
                    <th>ชื่อ</th>
                    <th>AreaCode</th>
                    <th>เบอร์โทร</th>
                    <th>อายุ</th>
                    <th>เพศ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((item, index) => (
                    <tr key={index}>
                      <td>{index + startIndex + 1}</td>
                      <td>{item.ID}</td>
                      <td><Image src={`${item.Picture}`} width="100px" height="100px"></Image></td>
                      <td>{item.Email}</td>
                      <td>{(item.EmployeeRole as EmployeeRoleInterface)?.Name}</td>
                      <td>{item.Name}</td>
                      <td>{(item.AreaCode as AreaCodesInterface)?.Name}</td>
                      <td>{item.Tel}</td>
                      <td>{item.Age}</td>
                      <td>{(item.Gender as GendersInterface)?.Name}</td>
                      <td>
                        <Popconfirm
                          title="ลบลูกเรือ"
                          description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย?"
                          onConfirm={() => handleDelete(item.ID)}
                          onCancel={() => cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Popover content={DeletePopOver}>
                            <Button icon={<DeleteOutlined />}></Button>
                          </Popover>
                        </Popconfirm>
                        <Popover content={EditPopOver}>
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                              if (item.ID !== undefined) {
                                setSelectedEmployeeID(item.ID);
                                setShowEdit(!showEdit);
                              }
                            }}
                          ></Button>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="employee-paging">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="employee-paging-backward"
                >
                  <IoIosArrowBack />
                </button>
                <span className="employee-current-page">{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= listEmployee.length}
                  className="employee-paging-forward"
                >
                  <IoIosArrowForward />
                </button>
              </div>
              {showEdit && (
                <div className="updatePopup">
                  <div className="update-form">
                    <EditEmployee onCancel={handleCancel} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </employeeIDContext.Provider>
    </>
  );
}
