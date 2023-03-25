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
  Area,
  AreaChart,
} from "recharts"

import { BouncyLoading } from "../loading/Loading";
import { CustomTooltip } from "./tooltip";

const Chart = ({ aspect, title, getTab, childToParent }) => {
  // const [temp, setTemp] = useState([])
  // const [humid, setHumid] = useState([])
  const [loading, setLoad] = useState(true)
  const [data, setData] = useState([])
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [timeStart, setTimeStart] = useState(new Date(Date.now() - (3600 * 1000 * 2)))

  useEffect(() => {
    const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${process.env.REACT_APP_ENITYID}/values/timeseries?keys=temperature,humidity&startTs=${timeStart.getTime().toString()}&endTs=${timeEnd.getTime().toString()}&interval=60000&limit=30`
    async function fetchData() {
      const response = await axios
        .get(API_URL, {
          headers: {
            "X-Authorization": process.env.REACT_APP_JWT_TOKEN,
            "Content-Type": "application/json"
          },
        })
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.log(err);
        })
      return response
    }
    const intervalId = setInterval(() => {
      fetchData().then(data => {
        // childToParent(data)
        if (data) {
          setTimeStart(new Date(Date.now() - (3600 * 1000 * 2)))
          setTimeEnd(new Date())
          setData(data['temperature'].reverse().map((item, index) => {
            return {
              temperature: item['value'],
              humidity: data['humidity'][index]['value'],
              ts: new Date(item.ts)
            }
          })
          )
          setLoad(false)
        }
      }
      )
      // Call the API every 5 seconds
    }, 5000);
    return () => clearInterval(intervalId);

  }, [data]);


  return (
    <div className="chart">
      <div className="title">{title}</div>
      {
        loading ?
          <BouncyLoading text={'Fetching Data!'} />
          :
          <div>
            <ResponsiveContainer width={'99%'} height={400}>
              <AreaChart
                // To get XAxis base
                data={data}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="tempID" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd6ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ffd6ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="humidID" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bbd0ff" stopOpacity={0.5} />
                    <stop offset="75%" stopColor="#bbd0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* <CartesianGrid strokeDasharray="3 13" stroke="white" /> */}
                <XAxis dataKey="ts" axisLine={true} tick={false} />
                <YAxis
                  yAxisId="left-axis"
                  type="number"
                  tickFormatter={tick => `${tick}°C`}
                  domain={[15, 60]}
                  stroke="white"
                />
                <YAxis
                  yAxisId="right-axis"
                  orientation="right"
                  type="number"
                  tickFormatter={tick => `${tick}%`}
                  domain={[0, 100]}
                  stroke="white"
                />
                <Tooltip wrapperStyle={{ outline: "none" }} content={<CustomTooltip />} />
                <Legend />
                {/* {getTab ? ( */}
                <Area
                  yAxisId="right-axis"
                  type="monotone"
                  // data={humid}
                  dataKey="humidity"
                  name="Humidity"
                  stroke="#bbd0ff"
                  fillOpacity={0.5}
                  fill="url(#humidID)"
                  dot={false}
                  strokewidth={8}
                  isAnimationActive={false}
                  activeDot={{ r: 3 }}
                  style={{
                    filter: `drop-shadow(0px 0px 5px #bbd0ff)`
                  }}
                />
                {/* ) : ( */}
                <Area
                  yAxisId="left-axis"
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature"
                  stroke="#ffd6ff"
                  fillOpacity={0.5}
                  fill="url(#tempID)"
                  dot={false}
                  strokewidth={8}
                  isAnimationActive={false}
                  activeDot={{ r: 3 }}
                  style={{
                    filter: `drop-shadow(0px 0px 5px #ffd6ff)`
                  }}
                />
                {/* )} */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
      }
    </div>
  );
};

export default Chart;
