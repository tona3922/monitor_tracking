import React from "react";
import "./addDeviceResult.scss";


const DeviceDetail = ({device, close}) => {
  return (
    <div className="popup-wrapper">
      <div className="resultForm" style={{ "background-color": "#424549" }} >
        {
          <>
            <div className="pseudo-grid">
              <div className="pseudo-ele"></div>
              <div className="form-header">Device detail</div>
              <div className="routeBack" onClick={close}>
                x
              </div>
            </div>
            <form>
              <div className="formInput">
                <input
                  className="input-field"
                  value={device.name}
                  name="text"
                  type="text"
                  read
                />
                <label htmlFor="text" className="inplabel">
                  Device Name
                </label>
              </div>
              <div className="formInput">
                <input
                  className="input-field"
                  value={device.thingsboard_name}
                  name="text"
                  type="text"
                />
                <label htmlFor="text" className="inplabel">
                  ID
                </label>
              </div>
              <div className="formInput">
                <input
                  className="input-field"
                  value={device.accessToken}
                  name="text"
                  type="text"
                />
                <label htmlFor="text" className="inplabel">
                  Access Token
                </label>
              </div>
              <div className="formInput">
                <input
                  className="input-field"
                  value={
                    device.isAirConditioner ? "Air Conditioner" : "Humidifier"
                  }
                  name="text"
                  type="text"
                />
                <label htmlFor="text" className="inplabel">
                  Device Type
                </label>
              </div>
            </form>
          </>
        }
      </div>
    </div>
  );
};

export default DeviceDetail;
