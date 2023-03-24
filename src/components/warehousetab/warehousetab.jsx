import { useEffect, useState } from "react";
import "./warehousetab.scss";

const warehouseData = [
  {
    id: 1,
    label: "Stock 1",
  },
  {
    id: 2,
    label: "Stock 2",
  },
  {
    id: 3,
    label: "Stock 3",
  },
  {
    id: 4,
    label: "Stock 4",
  },
];

const WareHouseTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [moreTab, setmoreTab] = useState(5);
  const tabs = warehouseData;
  // const [tabs, setTab] = useState(warehouseData);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const increasetab = () => {
    setmoreTab(moreTab + 1);
    tabs.push({ id: moreTab, label: "Stock " + moreTab });
    console.log(tabs);
  };
  console.log(activeTab);

  return (
    <div className="ml-[25px] flex justify-between bg-[theme] mt-[10px]">
      <div className="flex bg-status-off rounded-[10px]">
        {tabs.map((item) => (
          <div
            className={
              activeTab === item.id
                ? "border-b-2 cursor-pointer border-green-primary text-white-primary text-[16px] mr-[24px] font-bold first-letter:font-semibold w-[126px] h-[40px] flex justify-center items-center"
                : "cursor-pointer text-[#848184] text-[16px] mr-[24px] font-bold first-letter:font-semibold w-[126px] h-[40px] flex justify-center items-center"
            }
            key={item.id}
            onClick={() => handleTabClick(item.id)}
          >
            {item.label}
          </div>
        ))}
        <div className="border-l-2 flex bg-status-off text-white-primary w-[80px] justify-center items-center">
          Delete
        </div>
      </div>
      <div className="mr-[25px] bg-status-off text-white-primary flex justify-content items-center text-[14px] rounded-[10px] w-[100px]">
        <button
          className="pl-[10px]"
          onClick={() => {
            increasetab();
          }}
        >
          + Add Device
        </button>
      </div>
    </div>
  );
};

export default WareHouseTab;
