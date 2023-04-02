import { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "./device.scss";
import { Grid } from "@mui/material";
import DeviceCard from "../card/device-card";

import { useSelector, useDispatch } from 'react-redux'
import { addDevice, loadDevice, selectAC, selectHM } from "../../storage/figures/device";
// import mqtt as

// let deviceData = {
//     AC: [
//         {
//             id: 1,
//             label: "Air Condition 1",
//             "icon-off": "air.svg",
//             "icon-on": "air-on.svg",
//             status: false,
//         },
//         {
//             id: 3,
//             label: "Air Condition 2",
//             "icon-off": "air.svg",
//             "icon-on": "air-on.svg",
//             status: false,
//         },
//         {
//             id: 5,
//             label: "Air Condition 3",
//             "icon-off": "air.svg",
//             "icon-on": "air-on.svg",
//             status: false,
//         },
//     ],


//     HM: [
//         {
//             id: 6,
//             label: "Humidifier 3",
//             "icon-off": "humidifier.svg",
//             "icon-on": "humid-on.svg",
//             status: false,
//         },


//         {
//             id: 6,
//             label: "Humidifier 3",
//             "icon-off": "humidifier.svg",
//             "icon-on": "humid-on.svg",
//             status: false,
//         },


//         {
//             id: 6,
//             label: "Humidifier 3",
//             "icon-off": "humidifier.svg",
//             "icon-on": "humid-on.svg",
//             status: false,
//         },
//     ]
// }

// const lightAndFanState = [
//     { name: "Light 1", img: "light.svg", uptime: 3, level: 60 },
//     { name: "Light 2", img: "light.svg", uptime: 3, level: 60 },
//     { name: "Light 3", img: "light.svg", uptime: 3, level: 60 },
//     { name: "Fan 1", img: "fan.svg", uptime: 3, level: 60 },
//     { name: "Fan 2", img: "fan.svg", uptime: 3, level: 60 },
// ]

const AllDeviceOf = (props) => {
    // const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const deviceData = useSelector(props.type === 'AC' ? selectAC : selectHM)

    useEffect(() => {
        const load = async () => {
            await dispatch(loadDevice(props.type === 'AC' ? true : false))
        }
        const intervalId = setInterval(() => {
            load()
        }, 5000)
        return () => clearInterval(intervalId)
        // dispatch(loadDevice())
    }, [])
    // dispatch(loadDevice(true))


    return (
        <div className="m-10">
            <Grid container spacing={3} direction="row"
                alignItems="stretch" columns={{ xs: 4, sm: 8, md: 12 }}

            >
                {
                    deviceData.map((device, index) =>
                        <Grid item xs={4} sm={4} md={3} key={index}>
                            <DeviceCard type={props.type} {...device} />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
};

export default AllDeviceOf;
