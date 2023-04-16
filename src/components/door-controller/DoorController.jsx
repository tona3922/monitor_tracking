import React, { useState } from 'react';
import './DoorController.scss'
import PowerButton from './PowerButton';

export default function DoorController() {
    const [open, setOpen] = useState(true)

    return (
        <div className='door-controller-wrapper'>
            <div className='door-controller-title'>Warehouse's Door Control</div>
            <div className='door-controller-container'>
                <PowerButton open={open} setOpen={setOpen}/>
            </div>
        </div>
    )
}