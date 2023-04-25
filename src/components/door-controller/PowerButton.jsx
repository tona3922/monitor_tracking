import React from 'react';
import './power-button.css';

export default function PowerButton({open, setOpen}) {
    const handleCheckboxChange = () => {
        setOpen(!open)
    };

    return (
    <div className="round">
        <input
            type="checkbox"
            id="onoff"
            name="onoff"
            checked={open}
            onChange={handleCheckboxChange}
        />
        <div className='back'>
            <label className='but' for='onoff'>
                <span className="on">Open</span>
                <span className="off">Close</span>
            </label>
        </div>
    </div>
    )
}