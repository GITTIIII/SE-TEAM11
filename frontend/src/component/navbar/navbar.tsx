import { useEffect, useRef, useState } from "react";
import { GetTouristById } from "../../services/https/tourist";
import { TouristInterface } from "../../interface/ITourist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavbarTourist from "../tourist_manu/tourist_menu"
import logo1 from "../../asset/logo1.png"
import userProfile from "../../asset/no_profile.png"
import React from "react";
import RightMenu from "../right-menu/right-menu";
import RightMenu1 from "../right-menu/right-menu1";
import "./navbar.css"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [tourist, setTourist] = useState<TouristInterface[]>([]);
  const TouristID = localStorage.getItem("TouristID")
  const [Rclick, setRClick] = React.useState(false);
  const [Rclick1, setRClick1] = React.useState(false);
  const rightmenuRef = useRef<HTMLDivElement | null>(null);
  const rightmenuRef1 = useRef<HTMLDivElement | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    const closeMenu = (e: any) => {
      console.log(e);
      if (rightmenuRef.current && !rightmenuRef.current.contains(e.target)) {
        setRClick(false);
      }
      if (rightmenuRef1.current && !rightmenuRef1.current.contains(e.target)) {
        setRClick1(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    const fetchData = async () => {
      setTourist(await GetTouristById(Number(TouristID)));
    };
    fetchData();


    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
        <div className="navbar">
          <div className="topleft-navbar" onClick={() => navigate("/tourist/main")}>
            <img src={logo1} alt="logo" className="logo"/>
          </div>
            <div className="navbar-tourist">
              <NavbarTourist/>
            </div>
            <div 
              className="topright-navbar"
              onClick={() => setRClick(!Rclick)}
              ref={rightmenuRef}
            >
              <img src={Object(tourist)?.Picture === "" ? userProfile : Object(tourist)?.Picture} alt="userProfile" className="profile"/>
              {Rclick && <RightMenu />}
            </div>
            <div className="menu-icon"
                onClick={() => setRClick1(!Rclick1)}
                ref={rightmenuRef1}
            >
                <FontAwesomeIcon icon={faBars} className="icon"/>
                {Rclick1 && <RightMenu1/>}
            </div>
        </div>
  )
}
