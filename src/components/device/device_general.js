import React from 'react'
import DevicesPieChart from '../chart/PieChart'
import './device_general.scss'

// const LegendStack = (props) => {
//     return (
//         <div className="legend-wrapper">
//             <div className="device-type">{props.name}</div>
//             <div className="device-tag-container">
//                 <DevicesPieChart name={props.name} />
//                 <LegendStack></LegendStack>
//             </div>
//         </div>
//     )
// }

const Devices_Info = (props) => {
    return (
        <div className="device-wrapp">
            <div className="device-type">{props.name}</div>
            <div className="device-tag-container">
                <DevicesPieChart name={props.name} />
                {/* <LegendStack></LegendStack> */}
            </div>
        </div>
    )
}

export default Devices_Info