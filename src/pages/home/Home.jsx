import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useState } from "react";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Tab from "../../components/tabs/Tab";

const Home = () => {
  const [sensorData, setSensorData] = useState([{}]);

  const childToParent = (childData) => {
    setSensorData(childData);
  };
  console.log(sensorData);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Tab />
        <div className="widgets">
          <Widget
            type="temp"
            tempValue={sensorData[sensorData.length - 1].tempValue}
          />
          <Widget
            type="humid"
            humidValue={sensorData[sensorData.length - 1].humidValue}
          />
          <Widget type="air" />
          <Widget type="humidifier" />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Last 12 Months (Revenue)"
            aspect={2 / 1}
            childToParent={childToParent}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle text-[red]">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
