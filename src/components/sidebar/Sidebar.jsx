import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery, Drawer, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import "./sidebar.scss";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const SidebarContent = () => {
  const [activeTab, setActiveTab] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // console.log(activeTab);

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
          <g clipPath="url(#clip0_1601_734)">
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
              <stop stopColor="#EDBAFF" />
              <stop offset="1" stopColor="#A1FFFF" />
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
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <p className="title">WHAT'S GOING ON</p>
          <NavLink
            to="/products"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </NavLink>

          <NavLink
            to="/noti"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </NavLink>

          <p className="title">SERVICE</p>
          <NavLink
            to="/syscheck"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Check</span>
          </NavLink>
          <NavLink
            to="/mindset"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <PsychologyOutlinedIcon className="icon" />
            <span>Mindset</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </NavLink>
          <p className="title">USER</p>
          <NavLink
            to="/user"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "navlink"
            }
          >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

const Sidebar = ({isOpen, setIsOpen}) => {
  const isSmallScreen = useMediaQuery('(max-width: 960px)'); // md

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isSmallScreen ? (
          <Drawer anchor="left" open={isOpen} onClose={handleToggle}>
            <SidebarContent />
          </Drawer>
      ) : ( 
          <SidebarContent />
      )}
    </div>
  );

}

export default Sidebar;
