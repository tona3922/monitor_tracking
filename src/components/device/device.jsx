import { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "./device.scss";
// import mqtt as

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#3B3A4F",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#2E2E3E" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

let deviceData = [
  {
    id: 1,
    label: "Air Condition 1",
    "icon-off": "air.svg",
    "icon-on": "air-on.svg",
    status: false,
  },
  {
    id: 2,
    label: "Humidifier 1",
    "icon-off": "humidifier.svg",
    "icon-on": "humid-on.svg",
    status: false,
  },
  {
    id: 3,
    label: "Air Condition 2",
    "icon-off": "air.svg",
    "icon-on": "air-on.svg",
    status: false,
  },
  {
    id: 4,
    label: "Humidifier 2",
    "icon-off": "humidifier.svg",
    "icon-on": "humid-on.svg",
    status: false,
  },
  {
    id: 5,
    label: "Air Condition 3",
    "icon-off": "air.svg",
    "icon-on": "air-on.svg",
    status: false,
  },
  {
    id: 6,
    label: "Humidifier 3",
    "icon-off": "humidifier.svg",
    "icon-on": "humid-on.svg",
    status: false,
  },
];

const Device = () => {
  // const [status, setStatus] = useState(false)
  const [list, setList] = useState(deviceData);
  const [flag, setFlag] = useState(false);
  // console.log(status)

  const autoMode = async () => {
    const requestData = {
      method: "autoMode",
      params: flag ? "inactive" : "active",
    };
    console.log(requestData);
    const ENTITY_ID = "36c1d630-c489-11ed-9b15-dd2dac50548f";
    const URL = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${ENTITY_ID}/SHARED_SCOPE`;
    try {
      await axios
        .post(URL, requestData, {
          headers: {
            "X-Authorization": process.env.REACT_APP_JWT_TOKEN,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAutoMode = () => {
    autoMode();
    setFlag((item) => !item);
  };

  const updateDevice = (id) => {
    return list.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      } else return item;
    });
  };

  const postMethodDevice = async (id) => {
    const requestData = {
      method: `setFan_${id}`,
      params:
        list.find((item) => item.id === id).status === true ? "Off" : "On",
    };
    console.log(requestData);
    const ENTITY_ID = "36c1d630-c489-11ed-9b15-dd2dac50548f";
    const URL = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${ENTITY_ID}/SHARED_SCOPE`;
    try {
      await axios
        .post(URL, requestData, {
          headers: {
            "X-Authorization": process.env.REACT_APP_JWT_TOKEN,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (id) => {
    setList(updateDevice(id));
    postMethodDevice(id);
  };

  return (
    <div className="mx-[25px]">
      <div className="flex justify-between">
        <div className="">
          <div className="flex items-end mb-[10px] justify-between">
            <h1 className="font-semibold text-[28px] text-white-primary">
              My Devices
            </h1>
            <div className="flex items-center mx-[25px]">
              <p className="text-white-primary text-[12px] mr-[5px]">
                AUTO MODE
              </p>
              <IOSSwitch defaultChecked={flag} onClick={handleAutoMode} />
            </div>
          </div>
          <div className="pl-[10px] flex-initial w-[820px] grid grid-rows-2 grid-flow-col gap-1">
            {list.map((item) => (
              <div
                key={item.id}
                className={
                  item.status
                    ? "bg-status-on h-[163px] rounded-[20px] shadow mr-[10px] mb-[10px]"
                    : "bg-status-off h-[163px] rounded-[20px] shadow mr-[10px] mb-[10px]"
                }
              >
                <div className="flex justify-between px-[10px] pt-[10px]">
                  {item.status ? (
                    <img
                      src={item["icon-on"]}
                      className="w-[80px] fill-white-primary"
                    />
                  ) : (
                    <img
                      src={item["icon-off"]}
                      className="w-[80px] fill-white-primary"
                    />
                  )}
                  <div className="flex flex-col items-end p-[20px]">
                    <IOSSwitch
                      defaultChecked={item.status}
                      // onChange={handleSwitch}
                      onClick={() => handleClick(item.id)}
                    />
                    <div className="text-white-primary flex flex-col items-end mt-[20px]">
                      <p className="text-[17px] font-semibold">{item.label}</p>
                      <p className="text-[10px] text-[#7A7A7A]">
                        Active for 3 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="font-semibold text-[28px] text-white-primary mb-[10px]">
            Light & Fan
          </h1>

          <div className="bg-status-off h-fit rounded-[20px]">
            <div className="flex items-center p-[15px] justify-between">
              <div className="flex items-start w-[120px]">
                <img src="light.svg" className="w-[30px]" />
                <div className="flex flex-col">
                  <p className="text-white-primary text-[14px]">Light 1</p>
                  <p className="text-[10px] text-[#7A7A7A]">
                    Active for 3 hours
                  </p>
                </div>
              </div>
              <div className="ml-[100px]">
                <p className="text-white-primary font-semibold text-[13px]">
                  60%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;
