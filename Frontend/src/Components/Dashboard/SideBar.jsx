import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpen = menu.isOpen;

  const blackbackground = {
    position: "fixed",
    top: "70px",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: " rgba(0, 0, 0, 0.2)",
  }

  return (
    <>
      {windowSize < 768 && isOpen && <div style={blackbackground}></div>}
      <div
        className="sideBar"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "305px" : "70px",
          position: windowSize < "768" ? "fixed" : "static",
        }}
      >
        <span style={{ display: isOpen ? "block" : "none" }}>DASHBOARDS</span>
        <div className="mt-2">
          <NavLink to={"users"} className="navLink ">
            <FontAwesomeIcon icon={faUsers} className="navIcon" />
            <p style={{ display: isOpen ? "block" : "none" }}>Users</p>
          </NavLink>

          <NavLink to={"create"} className="navLink ">
            <FontAwesomeIcon icon={faUserPlus} className="navIcon" />
            <p style={{ display: isOpen ? "block" : "none" }}>Create User</p>
          </NavLink>

          <NavLink to={"editor"} className="navLink ">
            <FontAwesomeIcon icon={faUserPlus} className="navIcon" />
            <p style={{ display: isOpen ? "block" : "none" }}>Editors</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
