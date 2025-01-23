import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLinks";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpen = menu.isOpen;
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  const blackbackground = {
    position: "fixed",
    top: "70px",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: " rgba(0, 0, 0, 0.2)",
  };

  const LinkStyle = {
    display: isOpen ? "block" : "none",
  };

  const showLinks = links.map((link, key) => (
    <NavLink className={link.className} to={link.path} key={link.path} key ={key}>
      <FontAwesomeIcon icon={link.icon} className={link.iconStyle} />
      <p className={link.linkStyle}>{link.name}</p>
    </NavLink>
  ));
  
  

  return (
    <>
      {windowSize < 768 && isOpen && <div style={blackbackground}></div>}
      <div
        className="sideBar"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "19%" : "70px",
          position: windowSize < "768" ? "fixed" : "static",
        }}
      >
        <span style={LinkStyle}>DASHBOARDS</span>
        <div className="mt-2">
          {user.role === "1995" ? (
            <>{showLinks}</>
          ) : user.role === "1996" ? (
            <NavLink to={"editor"} className="navLink ">
              <FontAwesomeIcon icon={faUserPlus} className="navIcon" />
              <p style={LinkStyle}>Editors</p>
            </NavLink>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
