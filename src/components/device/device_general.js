import React from 'react'
import DevicesPieChart from '../chart/PieChart'
import './device_general.scss'
import { Link } from 'react-router-dom'


const Devices_Info = (props) => {
    return (
        <div className="device-wrapp">
            <div className="device-type">
                <div className="dt">{props.name} </div>
                <Link to={props.name === "Air Conditioner" ? "/device/air-conditioner" : "/device/humidifier"} >
                    <div className="detailed">DETAILS</div>
                </Link>
            </div>
            <div className="device-tag-container">
                <DevicesPieChart name={props.name} />
                {/* <LegendStack></LegendStack> */}
            </div>
        </div>
    )
}

export default Devices_Info