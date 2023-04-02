import React from 'react'
import { useState } from 'react'
import IOSSwitch from '../mui_component/IOSSwitch'

import './device-card.scss'

const img = {
    AC: {
        true: "air-on.svg",
        false: "air.svg",
    },
    HM: {
        true: "humid-on.svg",
        false: "humidifier.svg",
    },
}

const DeviceCard = (props) => {
    const [isActive, setisActive] = useState(props.status)
    const [isPending, setPending] = useState(false)

    console.log(props)

    const handleClick = async (id) => {
        if (isPending) return
        setisActive(!isActive)
        setPending(true)
        await new Promise(r => setTimeout(r, 1000))
            .then(ret => setPending(false))
        // else return
    };

    return (
        <div className="devCardwrapper" style={{ 'background-color': isActive && "#1e2124" }}>
            <img src={img[`${props.type}`][isActive ? "true" : "false"]} />
            <div className="devsummary">
                <div className={isPending && `pointer-events-none`}>
                    <IOSSwitch
                        checked={isActive}
                        // defaultValue={isActive}
                        // onChange={handleSwitch}
                        onClick={handleClick}
                    />
                </div>
                <div className="dev-name">{props.name}</div>
                <div className="chrono-active">Active for 3hrs</div>
            </div>
        </div>
    )
}

export default DeviceCard