import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { removeNewest } from '../../storage/figures/device'
import { selectNewestResponse } from '../../storage/figures/device'

import './addDeviceResult.scss'
import { BouncyLoading } from '../loading/Loading'

const AddDeviceResult = () => {
    const newDevice = useSelector(selectNewestResponse)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const back = () => {
        navigate("..")
        dispatch(removeNewest())
    }

    return (
        <div className="popup-wrapper"  >

            <div className="resultForm"
                style={{ "background-color": newDevice === undefined && "#424549" }}
            >
                {
                    newDevice === undefined
                        ? <BouncyLoading text="Create Device" />
                        :
                        <>
                            <div className="pseudo-grid">
                                <div className="pseudo-ele"></div>

                                <div className="form-header">Success!</div>
                                <div className="routeBack" onClick={back}>x</div>
                            </div>
                            <form>
                                <div className="formInput">
                                    <input className='input-field' value={newDevice.data.name} name="text" type="text" read />
                                    <label htmlFor="text" className="inplabel">
                                        Device Name
                                    </label>
                                </div>
                                <div className="formInput">
                                    <input className='input-field' value={newDevice.data.thingsboard_name} name="text" type="text" />
                                    <label htmlFor="text" className="inplabel">
                                        ID
                                    </label>
                                </div>
                                <div className="formInput">
                                    <input className='input-field' value={newDevice.data.accessToken} name="text" type="text" />
                                    <label htmlFor="text" className="inplabel">
                                        Access Token
                                    </label>
                                </div>
                                <div className="formInput">
                                    <input className='input-field' value={newDevice.data.isAirConditioner ? 'Air Conditioner' : 'Humidifier'} name="text" type="text" />
                                    <label htmlFor="text" className="inplabel">
                                        Device Type
                                    </label>
                                </div>
                            </form>
                        </>
                }
            </div>
        </div>
    )
}

export default AddDeviceResult