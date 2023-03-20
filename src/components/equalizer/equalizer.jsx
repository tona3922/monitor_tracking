import React, { useState, useEffect } from 'react';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './equalizer.css';
// import Sun from './sun.png';
// import Drop from './drop.png';
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
    const [temperature, setTemp] = useState(tempValue.tempValue)
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
    const [humidity, setHumid] = useState(humidValue.humidValue)
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

    const [sensorData, setSensorData] = useState([{}]);
    useEffect(() => {
      async function fetchData() {
        const response1 = await axios.get(
          "https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/cs-ce-dadn.humi-sensor/data"
        );
        const object1 = response1.data.reverse();
  
        const response2 = await axios.get(
          "https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/cs-ce-dadn.temp-sensor/data"
        );
        const object2 = response2.data.reverse();
  
        return [object1, object2];
      }
      fetchData().then(([ob1, ob2]) => {
        setSensorData(
          ob1.map((item,index) => {
            return {
              humidValue: item.value,
              tempValue: ob2[index].value,
              date: new Date(item.created_at),
            };
          })
        );
  
        })
        // childToParent(sensorData);
        switchTab(tab)
        console.log(sensorData);
  
      },[sensorData]);

    const [tab, setTab] = React.useState(0);
    const handleSwitchTab = (e, newValue) => {
      setTab(newValue);
    };
    console.log(tab)

    return (
        <div className='equalizer-container'>
            {tab === 0 && ( // temperature
                <TemperatureTab tempValue={sensorData[sensorData.length-1].tempValue}/>
            )}
            {tab === 1 && ( // humidity
                <HumidityTab humidValue={sensorData[sensorData.length-1].humidValue}/>
            )}            
            <Tabs value={tab} onChange={handleSwitchTab} aria-label="Tabs" centered>
                <Tab icon={<img src="temp-icon.svg" alt="Temperature icon"/>} aria-label="Temperature" />
                <Tab icon={<img src="humid-icon.svg" alt="Humidity icon"/>} aria-label="Humidity" />
            </Tabs>
        </div>
    )
}