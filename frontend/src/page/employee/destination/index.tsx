import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import "./destination.css";
import { Button, ConfigProvider } from "antd";
import cruise from "../../../asset/cruise.png";

export default function Destination() {
  return (
    <div className="cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      <h1 className="destination-header">Destination</h1>

      <div className="destination-headline" />

      <NavLink to="/employee/destination/create">
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
          <Button className="destination-add-button" type="primary">
            add a destination
          </Button>
        </ConfigProvider>
      </NavLink>
    </div>
  );
}
