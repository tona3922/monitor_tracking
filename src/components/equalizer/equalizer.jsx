import React, { useState, useEffect } from 'react';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './equalizer.css';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';


// export const CustomSlider = withStyles({
//   root: {
//     height: 3,
//     padding: "13px 0",
//   },
//   track: {
//     height: 4,
//     borderRadius: 2,
//   },
//   markLabel: {
//     color: "#fff",
//     fontWeight: 800
//   }
// })(Slider);

// function TemperatureTab(tempValue) {
//   const [temperature, setTemp] = useState(tempValue.tempValue)
//   const marks = [
//     {
//       value: 2,
//       label: 'Min',
//     },
//     {
//       value: 32,
//       label: 'Max',
//     },
//   ];
//   const valuetext = (value) => {
//     return value + "°C";
//   }
//   const handleChange = (event, newValue) => {
//     setTemp(newValue);
//   };

//   return (
//     <>
//       <div className='value-display-text'>{temperature}°C</div>
//       <div className='tab-tile-text'>Temperature</div>
//       <div style={{ width: "80%", margin: "auto" }}>
//         <CustomSlider
//           aria-label="Custom marks"
//           defaultValue={temperature}
//           onChange={handleChange}
//           getAriaValueText={valuetext}
//           step={1}
//           min={2}
//           max={32}
//           valueLabelDisplay="auto"
//           marks={marks}
//         />
//       </div>
//     </>
//   )
// }

// function HumidityTab(humidValue) {
//   console.log(humidValue)
//   const [humidity, setHumid] = useState(humidValue.humidValue)
//   const marks = [
//     {
//       value: 30,
//       label: 'Min',
//     },
//     {
//       value: 100,
//       label: 'Max',
//     },
//   ];
//   const valuetext = (value) => {
//     return value + "°C";
//   }
//   const handleChange = (event, newValue) => {
//     setHumid(newValue);
//   };

//   return (
//     <>
//       <div className='value-display-text'>{humidity}%</div>
//       <div className='tab-tile-text'>Humidity</div>
//       <div style={{ width: "80%", margin: "auto" }}>
//         <CustomSlider
//           aria-label="Custom marks"
//           defaultValue={humidity}
//           onChange={handleChange}
//           getAriaValueText={valuetext}
//           step={1}
//           min={30}
//           max={100}
//           valueLabelDisplay="auto"
//           marks={marks}
//         />
//       </div>
//     </>
//   )
// }

export default function Equalizer({ switchTab }) {
  const [tab, setTab] = React.useState(0);
  const handleSwitchTab = (e, newValue) => {
    setTab(newValue);
    switchTab(newValue)
  };
  const [temp, setTemp] = React.useState()
  const [humid, setHumid] = React.useState()
  const [time, setTime] = useState(new Date())
  // const [timeEnd, setTimeEnd] = useState(new Date())
  // const [timeStart, setTimeStart] = useState(new Date(Date.now() - (3600 * 1000 * 2)))
  // const marks = [
  //   {
  //     value: 2,
  //     label: 'Min',
  //   },
  //   {
  //     value: 32,
  //     label: 'Max',
  //   },
  // ];
  // console.log(temp[temp.length - 1])
  useEffect(() => {
    console.log(process.env.REACT_APP_ENITYID)
    const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${process.env.REACT_APP_ENITYID}/values/timeseries?keys=temperature,humidity`;
    async function fetchData() {
      const response = await axios
        .get(API_URL, {
          headers: {
            "X-Authorization": process.env.REACT_APP_JWT_TOKEN,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.log(err)
        })
      return response
    }
    const intervalId = setInterval(() => {
      fetchData().then(data => {
        setTemp(data.temperature[0].value)
        setHumid(data.humidity[0].value)
        setTime(new Date(data.temperature[0].ts))
        // console.log(data.temperature[0].ts)
      })

      // Call the API every 5 seconds
    }, 5000);
    return () => clearInterval(intervalId);

  }, [temp, humid]);

  const handleChange = (event, newValue) => {
    tab === 1 ? setHumid(newValue) : setTemp(newValue)
  };

  return (
    <div className='equalizer-container'>
      {/* {tab === 0 && ( // temperature
        <TemperatureTab tempValue={temp} />
      )}
      {tab === 1 && ( // humidity
        <HumidityTab humidValue={humid} />
      )} */}
      <div className='tab-tile-text'>{tab === 1 ? 'Humidity' : 'Temperature'}</div>
      <div className='value-display-text'>{tab === 1 ? Math.round(humid * 100) / 100 : Math.round(temp * 100) / 100}{tab === 1 ? '%' : '°C'}</div>

      {/* <div style={{ width: "80%", margin: "auto" }}>
        <CustomSlider
          aria-label="Custom marks"
          defaultValue={tab === 1 ? humid : temp}
          onChange={handleChange}
          // getAriaValueText={valuetext}
          step={1}
          min={30}
          max={100}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div> */}
      <div className='currTime'>Last Updated:</div>
      <div className='timeUpdated'>{time.toLocaleString()}</div>
      <Tabs value={tab} onChange={handleSwitchTab} aria-label="Tabs" centered>
        <Tab icon={<img src="temp-icon.svg" alt="Temperature icon" />} aria-label="Temperature" />
        <Tab icon={<img src="humid-icon.svg" alt="Humidity icon" />} aria-label="Humidity" />
      </Tabs>
    </div>
  )
}