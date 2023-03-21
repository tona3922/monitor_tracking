import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import { useState } from "react";
import ApexChart from "../../components/chart_1/Chart"
import Chart from "../../components/chart/Chart"
import Header from "../../components/header/header";
import WareHouseTab from "../../components/warehousetab/warehousetab"
import Device from "../../components/device/device"
import Equalizer from "../../components/equalizer/equalizer"
import Navbar from "../../components/navbar/Navbar";




const Home = () => {
  const [sensorData, setSensorData] = useState([{}]);
  const [getTab, setGetTab] = useState(0);
  const switchTab = (item) =>{
    setGetTab(item)
  }
  console.log(getTab);
  const childToParent = (childData) => {
    setSensorData(childData);
  };
  // console.log(sensorData);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer flex-6">
        <Navbar />
        <WareHouseTab />
        <div className="flex mt-[20px]">
          <Equalizer switchTab={switchTab}/>
          <Chart
            title="Sensor Value Collection at Warehouse"
            aspect={2 / 1}
            childToParent={childToParent}
            getTab={getTab}
          />
        </div>
        <Device />
      </div>
    </div>
  );
};

export default Home;
