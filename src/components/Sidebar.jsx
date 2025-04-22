import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import {
  FaHome,
  FaCar,
  FaClipboardList,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger button - hanya muncul di mobile */}
      <div className="hamburger d-md-none" onClick={toggleSidebar}>
        <FaBars size={24} color="#fff" />
      </div>

      {/* Sidebar utama */}
      <div className={`sidebar ${isOpen ? "show" : ""}`}>
        <h3 className="text-white" style={{ marginBottom: "30px", textAlign: "center" }}>
          Peminjaman
        </h3>
        <ul>
          <li>
            <NavLink to={"/dashboard/dashboard"} className={({ isActive }) => (isActive ? "active" : "")}>
              <FaHome className="icon" /> Beranda
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/daftarkendaraan"} className={({ isActive }) => (isActive ? "active" : "")}>
              <FaCar className="icon" /> DaftarKendaraan
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/daftarpeminjaman"} className={({ isActive }) => (isActive ? "active" : "")}>
              <FaClipboardList className="icon" /> DaftarPeminjaman
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/daftarpengembalian"} className={({ isActive }) => (isActive ? "active" : "")}>
              <FaClipboardList className="icon" /> DaftarPengembalian
            </NavLink>
          </li>
        </ul>

        <div className="logout-container">
          <Button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt className="icon" /> Keluar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
