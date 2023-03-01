import { useEffect, useState } from "react";
import axios from "axios";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";

const data = [
  { name: "Jan", Total: 1200 },
  { name: "Feb", Total: 2100 },
  { name: "Mar", Total: 800 },
  { name: "Apr", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
  { name: "July", Total: 1900 },
  { name: "Aug", Total: 1700 },
  { name: "Sep", Total: 2700 },
  { name: "Oct", Total: 2860 },
  { name: "Nov", Total: 2400 },
  { name: "Dec", Total: 3000 },
];
// console.log(data)

const Chart = ({ aspect, title, childToParent }) => {
  // const [temp, setTemp] = useState([{}]);
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
      childToParent(sensorData);
      // console.log(sensorData);

    },[sensorData]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={730}
          height={250}
          data={sensorData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="humidValue"
            name="Humidity"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="tempValue" 
            name="Temperature"
            stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
