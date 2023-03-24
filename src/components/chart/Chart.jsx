import { useEffect, useState } from "react";
import axios from "axios";
import "./chart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";

const Chart = ({ aspect, title, getTab, childToParent }) => {
  const [temp, setTemp] = useState([]);
  const [humid, setHumid] = useState([]);
  const timeStart = new Date("2023-03-20T00:00:00Z").getTime().toString();
  const timeEnd = new Date("2023-03-20T18:00:00Z").getTime().toString();
  const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${process.env.REACT_APP_ENITYID}/values/timeseries?keys=TEMPERATURE,HUMIDITY&startTs=${timeStart}&endTs=${timeEnd}&interval=60000&limit=100`;
  useEffect(() => {
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
          console.log(err);
        }); 
        return response
    }
    const intervalId = setInterval(() => {
      fetchData().then(data => {
        // childToParent(data)
        setTemp(data['TEMPERATURE'].map(item => {
          return{
            ...item,
            ts: new Date(item.ts)
          }
        }))
        setHumid(data['HUMIDITY'].map(item => {
          return{
            ...item,
            ts: new Date(item.ts)
          }
        }))
      })
    // Call the API every 5 seconds
    }, 5000);
    
    return () => clearInterval(intervalId);
    
  }, [temp, humid]);


  return (
    <div className="chart w-[800px] px-[10px] mr-[20px]">
      <div className="title">{title}</div>
        <div>
        <LineChart
          width={700}
          height={400}
          data={getTab ? humid : temp}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="ts" />
          <YAxis
            type="number"
            domain={[0, 100]}
            stroke="white"
          />
          <Tooltip />
          <Legend />
          {getTab ? (
            <Line
              type="monotone"
              dataKey="value"
              name="Humidity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="value"
              name="Temperature"
              stroke="#38b000"
              // activeDot={{ r: 8 }}
            />
          )}
        </LineChart>
        </div>
    </div>
  );
};

export default Chart;
