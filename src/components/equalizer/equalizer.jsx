import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './equalizer.css';
import Sun from './sun.png';
import Drop from './drop.png';
import Slider from '@mui/material/Slider';


function TemperatureTab() {
    const [temperature, setTemp] = useState(24)
    const marks = [
        {
          value: 16,
          label: '16',
        },
        {
          value: 32,
          label: '32',
        },
      ];    
    const valuetext = (value) => {
        return value + "°C";
    }
    const handleChange = (event, newValue) => {
        setTemp(newValue);
    };    

    return (
    <>
        <div className='value-display-text'>{temperature}°C</div>
        <div className='tab-tile-text'>Temperature</div>
        <div style={{width: "80%", margin: "auto"}}>
        <Slider
            aria-label="Custom marks"
            defaultValue={temperature}
            onChange={handleChange}
            getAriaValueText={valuetext}
            step={1}
            min={16}
            max={32}
            valueLabelDisplay="auto"
            marks={marks}
        />    
        </div>
    </>
    )
}

function HumidityTab() {
    const [humidity, setHumid] = useState(24)
    const marks = [
        {
          value: 16,
          label: '16',
        },
        {
          value: 32,
          label: '32',
        },
      ];    
    const valuetext = (value) => {
        return value + "°C";
    }
    const handleChange = (event, newValue) => {
        setHumid(newValue);
    };    

    return (
    <>
        <div className='value-display-text'>{humidity}g/kg</div>
        <div className='tab-tile-text'>Humidity</div>
        <div style={{width: "80%", margin: "auto"}}>
        <Slider
            aria-label="Custom marks"
            defaultValue={humidity}
            onChange={handleChange}
            getAriaValueText={valuetext}
            step={1}
            min={16}
            max={32}
            valueLabelDisplay="auto"
            marks={marks}
        />    
        </div>
    </>
    )
}

export default function Equalizer() {
    const [tab, setTab] = React.useState(0);
    const handleSwitchTab = (e, newValue) => {
      setTab(newValue);
    };

    return (
        <div className='equalizer-container'>
            {tab === 0 && ( // temperature
                <TemperatureTab />
            )}
            {tab === 1 && ( // humidity
                <HumidityTab />
            )}            
            <Tabs value={tab} onChange={handleSwitchTab} aria-label="Tabs" centered>
                <Tab icon={<img src={Sun} alt="Temperature icon"/>} aria-label="Temperature" />
                <Tab icon={<img src={Drop} alt="Humidity icon"/>} aria-label="Humidity" />
            </Tabs>
        </div>
    )
}