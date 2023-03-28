import "./navbar.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import profileimage from "../../image/profile.jpg";
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery, IconButton } from "@mui/material";
// import Tab from "../tabs/Tab";

const Navbar = ({isOpen, setIsOpen}) => {
  const isSmallScreen = useMediaQuery('(max-width: 960px)'); // md
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };  
  return (
    <div className="navbar">
      <div className="wrapper">       
        <div className="left">
          {isSmallScreen && (
            <IconButton onClick={handleToggle} sx={{color:"aliceblue"}}>
              <MenuIcon />
            </IconButton>      
          )}     
          <h1 
          className={`text-white-primary font-semibold flex items-center
          ${!isSmallScreen? "text-[28px]": "text-[20px]"}
          `}
          >
            Dashboard
          </h1>
          {!isSmallScreen && (
            <div className="item">
              <input placeholder="search" className="rounded-[10px] px-[10px]" />
              <SearchIcon className="icon" />
            </div>   
          )}            
        </div>
        <div className="right">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
          </div>
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img src={profileimage} alt="" className="avatar" />
          </div>
        </div>
      </div>
      {/* <Tab /> */}
    </div>
  );
};

export default Navbar;
