import React from 'react'
import './addDevice.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../storage/figures/user'

import { addDevice } from '../../storage/figures/device'
// import { Routes, Route } from "react-router-dom"

const AddDeviceForm = (props) => {
    const [deviceName, setdeviceName] = useState('')
    const [empty, setEmpty] = useState(false)

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const back = () => {
        navigate("..")
    }

    const fade = async () => {
        await new Promise(r => setTimeout(r, 2000))
        setEmpty(false)
    }

    const handleSubmit = () => {
        setdeviceName(deviceName.trim())
        if (deviceName === '') {
            setEmpty(true)
            fade()
        } else {
            const info = {
                nameDevice: deviceName,
                email: user.email,
                isAC: props.type === 'AC'
            }
            dispatch(addDevice(info))
            navigate("../addResult")
        }

    }

    const _handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }
    // const handleKeyDown
    return (
        <>
            <div className="popup-wrapper"  >

                <div className="addform" >
                    <div className="pseudo-grid">
                        <div className="pseudo-ele"></div>

                        <div className="form-header">Add {props.type == "AC" ? 'Air Conditioner' : 'Humidifier'}</div>
                        <div className="routeBack" onClick={back}>x</div>
                    </div>
                    <form>
                        <div className="formInput">
                            <input className='input-field' name="text" type="text" value={deviceName} required onChange={(e) => setdeviceName(e.target.value)} onKeyDown={_handleKeyDown} />
                            <label htmlFor="text" className="inplabel">
                                Device Name
                            </label>
                        </div>
                    </form>
                    {empty && <div className="submitfailed">Please enter a non-empty string</div>}
                    <div className={deviceName === '' ? "submitbutton" : "validbutton"} onClick={handleSubmit}>
                        Submit
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDeviceForm