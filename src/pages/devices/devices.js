import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'


import './devices.scss'
import Device from '../../components/device/device_detail'
import AllDeviceOf from '../../components/device/device_detail'

const DeviceDetails = (props) => {
    return (
        <div className="page">
            <Sidebar />
            <div className="main-section">
                <Navbar title={props.type === 'AC' ? "List of Air Conditioners" : "List of Humidifiers"} searchBar={true} />
                <AllDeviceOf {...props} />
            </div>
        </div>
    )
}

export default DeviceDetails