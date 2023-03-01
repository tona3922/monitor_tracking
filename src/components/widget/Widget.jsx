import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AcUnitIcon from '@mui/icons-material/AcUnit';
// import "./widget.scss";


const Widget = ({ type, tempValue, humidValue }) => {
  let data;

  switch (type) {
    case "temp":
      data = {
        value: tempValue + '*C',
        title: "TEMPERATURE",
        isMoney: false,
        link: "View Detail",
        icon: (
          <DeviceThermostatIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "humid":
      data = {
        value: humidValue + '%',
        title: "HUMIDITY",
        isMoney: false,
        link: "View Detail",
        icon: (
          <AcUnitIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "air":
      data = {
        title: "AIR CONDITION",
        value: "ON",
        link: "Setting",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "humidifier":
      data = {
        title: "HUMIDIFIER",
        value: "OFF",
        link: "Setting",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget bg-slate-300">
      <div className="left">
        <span className="text-[red] text-[40px]">{data.title}</span>
        <span className="counter">  
         {data.value}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
