import "./navbar.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import profileimage from "../../image/profile.jpg";
// import Tab from "../tabs/Tab";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <h1 className="text-white-primary font-semibold text-[28px]">Dashboard</h1>
          <div className="item">
            <input placeholder="search" className="rounded-[10px] px-[10px]"/>
            <SearchIcon className="icon" />
          </div>
        </div>
        <div className="right">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
          </div>
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
