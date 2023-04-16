import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import { useState } from "react";
import Chart from "../../components/chart/Chart"
import Header from "../../components/header/header";
import WareHouseTab from "../../components/warehousetab/warehousetab"
import Device from "../../components/device/device"
import Equalizer from "../../components/equalizer/equalizer"
import Navbar from "../../components/navbar/Navbar";
import Devices_Info from "../../components/device/device_general";
import DoorController from "../../components/door-controller/DoorController";

const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const switchTab = (item) => {
    setCurrentTab(item)
  }
  const [showSidebar, setShowSideBar] = useState()

  return (
    <div className="home">
      <Sidebar isOpen={showSidebar} setIsOpen={setShowSideBar} />
      <div className="main-section">
        <Navbar isOpen={showSidebar} setIsOpen={setShowSideBar} title={"Dashboard"} />
        <div className="homeContainer">
          <div className="temp--humid">
            <Equalizer switchTab={switchTab} />
            <Chart
              title="Sensor Value Collection at Warehouse"
              currentTab={currentTab}
            />
          </div>
          <div className="pair">
            <Devices_Info name="Air Conditioner" />
            <Devices_Info name="Humidifier" />
          </div>
          {/* <Device /> */}
          <div className="pair">
            <div className="w-full lg:w-1/2">
              <DoorController/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
