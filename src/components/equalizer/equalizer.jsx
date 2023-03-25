import React, { useState, useEffect } from 'react';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './equalizer.css';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';


export const CustomSlider = withStyles({
  root: {
      height: 3,
      padding: "13px 0",
  },
  track: {
      height: 4,
      borderRadius: 2,
  },
  markLabel:{
    color: "#fff",
    fontWeight: 800
  }
})(Slider);

function TemperatureTab(tempValue) {
    const [temperature, setTemp] = useState(tempValue.tempValue === undefined ? 0 : tempValue.tempValue.value)
    const marks = [
        {
          value: 2,
          label: 'Min',
        },
        {
          value: 32,
          label: 'Max',
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
        <CustomSlider
            aria-label="Custom marks"
            defaultValue={temperature}
            onChange={handleChange}
            getAriaValueText={valuetext}
            step={1}
            min={2}
            max={32}
            valueLabelDisplay="auto"
            marks={marks}
        />    
        </div>
    </>
    )
}

function HumidityTab(humidValue) {
    const [humidity, setHumid] = useState( humidValue.humidValue === undefined ? 0 : humidValue.humidValue.value)
    const marks = [
        {
          value: 30,
          label: 'Min',
        },
        {
          value: 100,
          label: 'Max',
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
        <div className='value-display-text'>{humidity}%</div>
        <div className='tab-tile-text'>Humidity</div>
        <div style={{width: "80%", margin: "auto"}}>
        <CustomSlider
            aria-label="Custom marks"
            defaultValue={humidity}
            onChange={handleChange}
            getAriaValueText={valuetext}
            step={1}
            min={30}
            max={100}
            valueLabelDisplay="auto"
            marks={marks}
        />    
        </div>
    </>
    )
}

export default function Equalizer({switchTab}) {
    const [tab, setTab] = React.useState(0);
    const handleSwitchTab = (e, newValue) => {
      setTab(newValue);
      switchTab(newValue)
    };
    const [temp, setTemp] = React.useState([])
    const [humid, setHumid] = React.useState([])
    useEffect(() => {
      const timeStart = new Date("2023-03-20T00:00:00Z").getTime().toString();
      const timeEnd = new Date("2023-03-20T18:00:00Z").getTime().toString();
      const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${process.env.REACT_APP_ENITYID}/values/timeseries?keys=TEMPERATURE,HUMIDITY&startTs=${timeStart}&endTs=${timeEnd}&interval=60000&limit=100`;
      async function fetchData() {
       const response = await axios.get(API_URL, {
            headers: {
              "X-Authorization": process.env.REACT_APP_JWT_TOKEN,
              "Content-Type": "application/json",
            },
          })
          return response.data
      }
        fetchData().then(data => {
          setTemp(data['TEMPERATURE'].map(item => {
            return{
              value: item.value
            }
          }))
          setHumid(data['HUMIDITY'].map(item=> {
            return{
              value: item.value
            }
          }))
        })
    }, [temp, humid]);

    return (
        <div className='equalizer-container'>
            {tab === 0 && ( // temperature
                <TemperatureTab tempValue={temp[temp.length - 1]}/>
            )}
            {tab === 1 && ( // humidity
                <HumidityTab humidValue={humid[humid.length - 1]}/>
            )}            
            <Tabs value={tab} onChange={handleSwitchTab} aria-label="Tabs" centered>
                <Tab icon={<img src="temp-icon.svg" alt="Temperature icon"/>} aria-label="Temperature" />
                <Tab icon={<img src="humid-icon.svg" alt="Humidity icon"/>} aria-label="Humidity" />
            </Tabs>
        </div>
    )
}