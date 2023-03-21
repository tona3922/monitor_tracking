import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactApexChart from 'react-apexcharts';






export default function ApexChart(props) {

  const [sensorData, setSensorData] = useState([{}]);
  const [data, setData] = useState([{x:'', y: ''}])
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

    },[sensorData]);

    const colsPerDay = 2
    const groups = [
        { title: 'Mon', cols: colsPerDay },
        { title: 'Tue', cols: colsPerDay },
        { title: 'Wed', cols: colsPerDay },
        { title: 'Thu', cols: colsPerDay },
        { title: 'Fri', cols: colsPerDay },
        { title: 'Sat', cols: colsPerDay },
        { title: 'Sun', cols: colsPerDay },

      ]

    
    // data should be changed on reload so not necessary to be in state
    

    const state = {
        chart:{
          foreColor: "#ffff"
        },
        series: [{
          name: "Chỉ số gì đó",
          data: data,
        }],
        options: {
          chart: {
            type: 'bar',
            height: 380
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function(val) {
                return val
              },
            },
            group: {
              style: {
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
              },
              groups: groups
            },
          },
          title: {
              style:{
                color: "#fff"
              },
              text: 'Tiêu đề gì đó',
          },
          tooltip: {
            x: {
              formatter: function(val) {
                return val
              }  
            }
          },
        },
      
      
      }

    return (
        <div className='w-[700px] px-[20px]'>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={380} />
        </div>
    )
}