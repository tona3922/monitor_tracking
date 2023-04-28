import React from 'react';
import axios from 'axios';
import './power-button.css';

export default function PowerButton({open, setOpen}) {
    const handleCheckboxChange = () => {
        setOpen(!open)
        const requestData = {
            method: `setServo`,
            params: open ? "Off" : "On"
          };
          console.log(requestData);
          const ENTITY_ID = "5fb3b7c0-da91-11ed-a4fc-57550caf43ca";
          const URL = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${ENTITY_ID}/SHARED_SCOPE`;
          try {
               axios
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