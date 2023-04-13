import { useState, useEffect } from "react"
import "./device.scss"
import { Grid } from "@mui/material"
import DeviceCard from "../card/device-card"
import { Link } from "react-router-dom"

import { Routes, Route } from "react-router-dom"
import { selectUser } from "../../storage/figures/user"
import { useSelector, useDispatch } from 'react-redux'
import { loadDevice, selectAC, selectHM } from "../../storage/figures/device"
import AddDeviceForm from "../pop-up/addDevice"
import AddDeviceResult from "../pop-up/addDeviceResult"
import DeviceDetail from "./deviceResult"




const AllDeviceOf = (props) => {
    // const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const deviceData = useSelector(props.type === 'AC' ? selectAC : selectHM)
    const user = useSelector(selectUser)
    const [isActive, setIsActive] = useState(false)
    const [curDv, setCurDv] = useState()

    useEffect(() => {
        const load = async () => {
            await dispatch(loadDevice(props.type === 'AC' ? true : false, user.email))
        }
        const intervalId = setInterval(() => {
            load()
        }, 5000)
        return () => clearInterval(intervalId)
        // dispatch(loadDevice())
    }, [])
    // dispatch(loadDevice(true))
    const handleDevice = (id) => {
        setIsActive(true)
        setCurDv(deviceData.find(item => item._id === id))
        console.log(curDv)
    }
    const closeHandle = () => {
        setIsActive(false)
    }

    // console.log(curDv)

    return (
        <>
            <div className="m-10">
                <Grid container spacing={3} direction="row"
                    alignItems="stretch" columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {
                        deviceData.map((device, index) =>
                            <Grid item xs={4} sm={4} md={3} key={index} onClick={() => handleDevice(device._id)}>
                                <DeviceCard type={props.type} {...device} close={closeHandle} />
                            </Grid>
                        )
                    }
                </Grid>
                {
                    isActive && <DeviceDetail device={curDv} close={closeHandle}/>
                }

                <Link to="./add" >
                    <div className="addButton">
                        <div className="symbol">+</div>
                        <div className="text-sign">ADD NEW DEVICE</div>
                    </div>
                </Link>


            </div>
            <Routes>
                <Route path="/add/*" element={<AddDeviceForm type={props.type} />} />
                <Route path="/addResult/*" element={<AddDeviceResult />} />
            </Routes>
        </>
    );
};

export default AllDeviceOf;
