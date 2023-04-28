import React, {useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Device from '../../components/device/device_detail'
import AllDeviceOf from '../../components/device/device_detail'
import IOSSwitch from '../../components/mui_component/IOSSwitch'
import './devices.scss'
import axios from 'axios'

const DeviceDetails = (props) => {
    const [state, setState] = useState(false)
    
    const handleClick = async () => {
        setState(item => !item)
        const deviceID = "5fb3b7c0-da91-11ed-a4fc-57550caf43ca"
        const requestData = {
            method: "autoMode",
            params: state ? "inactive" : "active"
        }
          const URL = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${deviceID}/SHARED_SCOPE`;
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
    }

    return (
        <div className="page">
            <Sidebar />
            <div className="main-section">
                <Navbar title={props.type === 'AC' ? "List of Air Conditioners" : "List of Humidifiers"} searchBar={true} />
                <div className='ml-[40px]'>
                    <p className='text-white-primary'>Automatic Mode</p>
                    <IOSSwitch
                        checked={state}
                      onClick={handleClick}
                    />
                </div>
                <AllDeviceOf {...props} />
            </div>
        </div>
    )
}

export default DeviceDetails