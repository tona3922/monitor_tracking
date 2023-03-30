import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const [open, setOpen] = useState(false);
  const [nameDevice, setNameDevice] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeTab, setActiveTab] = useState(1);
  const [moreTab, setmoreTab] = useState(5);
  const tabs = warehouseData;
  // const [tabs, setTab] = useState(warehouseData);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // const increasetab = () => {
  //   setmoreTab(moreTab + 1);
  //   tabs.push({ id: moreTab, label: "Stock " + moreTab });
  //   console.log(tabs);
  // };
  const handleAddDevice = async () => {
    const response = await axios.post(
      "http://localhost:8080/device/add",
      nameDevice
    );
    response.then((data) => console.log(data)).catch((err) => console.log(err));
  };
  const handleChangeAddDevice = (e) => {
    setNameDevice(e.target.value);
  };
  console.log(nameDevice)

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
            handleOpen();
          }}
        >
          + Add Device
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 className="text-poppins font-bold text-[25px] mb-[10px]">
              Add device
            </h2>
            <div className="flex items-center justify-around">
              <FormControl>
                <InputLabel htmlFor="my-input">Name of device</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  onChange={handleChangeAddDevice}
                />
                <FormHelperText id="my-helper-text">
                  Must be more than 5 characters.
                </FormHelperText>
              </FormControl>
              <Button
                onClick={handleAddDevice}
                variant="outlined"
                size="small"
                color="success"
                sx={{ marginLeft: "10px" }}
              >
                Add
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WareHouseTab;
