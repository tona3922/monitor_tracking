import { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "./device.scss";
import { Grid } from "@mui/material";
import DeviceCard from "../card/device-card";

import { useSelector, useDispatch } from 'react-redux'
import { addDevice, loadDevice, selectAC, selectHM } from "../../storage/figures/device";



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
            <div className="addButton">
                <div className="symbol">+</div>
                <div className="text-sign">ADD NEW DEVICE</div>
            </div>
        </div>
    );
};

export default AllDeviceOf;
