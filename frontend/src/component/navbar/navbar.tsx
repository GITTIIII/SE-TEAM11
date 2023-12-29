import "./navbar.css"
import NavbarTourist from "../tourist_manu/tourist_menu"
import logo1 from "../../asset/logo1.png"
import userProfile from "../../asset/no_profile.png"
import { useEffect, useRef } from "react";
import React from "react";
import RightMenu from "../right-menu/right-menu";

export default function Navbar() {
  const [Rclick, setRClick] = React.useState(false);
  const rightmenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: any) => {
      console.log(e);
      if (rightmenuRef.current && !rightmenuRef.current.contains(e.target)) {
        setRClick(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
        <div className="navbar">
          <div className="topleft-navbar">
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
              <img src={userProfile} alt="userProfile" className="profile"/>
              {Rclick && <RightMenu />}
            </div>
        </div>
  )
}
