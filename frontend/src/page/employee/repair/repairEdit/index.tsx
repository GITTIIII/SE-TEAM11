import React, { useEffect, useState } from "react";
import "./repairEdit.css";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { repairIDContext } from "..";

import { GetRepairById, UpdateRepair } from "../../../../services/https/repair";
import { GetAllRepairType } from "../../../../services/https/repairType";
import { RepairInterface } from "../../../../interface/IRepair";
import { RepairTypeInterface } from "../../../../interface/IRepairType";

function RepairEdit({
  open,
  onClose,
}: {
  open: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const [type, setType] = useState<RepairTypeInterface[]>([]);
  const [repair,setRepair] = useState<RepairInterface>();

  const getRepairType = async () => {
    let res = await GetAllRepairType();

    if (res) {
      setType(res);
    }
  };

  const getRepairByID = async () => {
    let res = await GetRepairById(Number(repairID));

    if(res) {
      setRepair(res);
    }
  };

  useEffect(() => {
    getRepairType();
    getRepairByID();
  }, []);

  const repairID = useContext(repairIDContext);
  console.log(repairID);
  console.log(repair?.Comment);
  if (!open) return null;
  return (
    <>
      <div className="repair-edit">
        <h1>Repair Edit</h1>

        <h3>Issue : {repair?.Comment}</h3>

        <Form>
          <select className="repair-edit-form" name="RepairTypeID">
            <option value="none" hidden>
              เลือกประเภท
            </option>
            {type.map((item) => (
              <option value={item.ID} key={item.Repair_name}>
                {item.Repair_name}
              </option>
            ))}
          </select>
          <textarea
            className="repair-textarea"
            placeholder="Enter your detail"
          />
          <input id="repair_img" type="file" accept="image/*" />
        </Form>
        <a onClick={onClose}>Close</a>
      </div>
    </>
  );
}

export default RepairEdit;
