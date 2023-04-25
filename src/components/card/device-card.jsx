import React from "react";
import { useState } from "react";
import IOSSwitch from "../mui_component/IOSSwitch";
import DeviceDetail from "../device/deviceResult"
import axios from "axios";

import "./device-card.scss";

const img = {
  AC: {
    true: "air-on.svg",
    false: "air.svg",
  },
  HM: {
    true: "humid-on.svg",
    false: "humidifier.svg",
  },
};

const DeviceCard = (props) => {
  // console.log("device: ", props.name);
  const [isActive, setisActive] = useState(props.status);
  const [isPending, setPending] = useState(false);

  const switchMethod = async (id) => {  
    const requestData = {
      method:
        "setAC_" +
        `${props._id === id && props.thingsboard_name.split("_")[1]}`,
      params: isActive ? "Off" : "On",
    };
    console.log(requestData);
    // const ENTITY_ID = "2c687400-c489-11ed-9b15-dd2dac50548f";
    const URL = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${props.enityID}/SHARED_SCOPE`;
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

  const handleClick = async (id) => {
    if (isPending) return;
    setisActive(!isActive);
    setPending(true);
    switchMethod(id);
    await new Promise((r) => setTimeout(r, 1000)).then((ret) =>
      setPending(false)
    );
    props.close()
  };

  return (
    <>
      <div
        className="devCardwrapper"
        style={{ backgroundColor: isActive && "#1e2124" }}
        // onClick={() => handleDetails(props._id)}
      >
        <img src={img[`${props.type}`][isActive ? "true" : "false"]} />
        <div className="devsummary">
          <div className={isPending && `pointer-events-none`}>
            <IOSSwitch
              checked={isActive}
              onClick={()=>handleClick(props._id)}
            />
          </div>
          <div className="dev-name">{props.name}</div>
          <div className="chrono-active">Active for 3hrs</div>
        </div>
      </div>
    </>
  );
};

export default DeviceCard;
