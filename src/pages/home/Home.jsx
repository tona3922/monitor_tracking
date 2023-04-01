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
import { Grid } from "@mui/material";


const Home = () => {
  const [getTab, setGetTab] = useState(0);
  const switchTab = (item) => {
    setGetTab(item)
  }
  console.log(getTab);
  const [showSidebar, setShowSideBar] = useState()

  return (
    <div className="home">
      <Sidebar isOpen={showSidebar} setIsOpen={setShowSideBar}/>
      <div className="main-section">
        <Navbar isOpen={showSidebar} setIsOpen={setShowSideBar}/>
        <div className="homeContainer">
          <WareHouseTab />
          {/* <div className="temp--humid">
            <Equalizer switchTab={switchTab} />
            <Chart
              title="Sensor Value Collection at Warehouse"
              // getTab={getTab}
            />
          </div> */}
          <Grid container alignItems="flex-end" justifyContent="space-evenly" style={{marginBottom: '10px'}}>
            <Grid item md={12} lg={4}>
              <Equalizer switchTab={switchTab} />
            </Grid>
            <Grid item md={12} lg={7}>
              <Chart
                title="Sensor Value Collection at Warehouse"
                getTab={getTab}
              />              
            </Grid>            
          </Grid>          
          <Device />
        </div>
      </div>
    </div>
  );
};

export default Home;
