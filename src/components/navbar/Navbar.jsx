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
          <div className="item">DashBoard</div>
          <div className="item">
            <input placeholder="search here" />
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
