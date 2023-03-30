import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./sidebar.scss";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(activeTab);

  return (
    <div className="sidebar">
      <div className="top">
        <svg
          width="38"
          height="32"
          viewBox="0 0 38 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1601_734)">
            <path
              d="M16.6255 0.30188L37.1375 20.7309V31.6981H27.5652V24.6734L12.6671 9.83541H9.57228V31.6981H0V0.30188H16.6255ZM27.5652 11.1974V0.30188H37.1375V11.1974H27.5652Z"
              fill="url(#paint0_linear_1601_734)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1601_734"
              x1="37.1375"
              y1="0.30188"
              x2="6.17891"
              y2="36.9218"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EDBAFF" />
              <stop offset="1" stop-color="#A1FFFF" />
            </linearGradient>
            <clipPath id="clip0_1601_734">
              <rect width="37.8182" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-[15px] font-bold ml-[5px] leading-tight text-white-primary">
          Warehouse <br /> Tracking
        </p>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li
              onClick={() => handleTabClick("")}
              className={activeTab === "" ? "active" : ""}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">WHAT'S GOING ON</p>
          <Link to="/products">
            <li
              onClick={() => handleTabClick("products")}
              className={activeTab === "products" ? "active" : ""}
            >
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Check</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Mindset</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
