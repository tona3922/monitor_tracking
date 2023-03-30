import "./new.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

const New = ({ inputs }) => {
  const [info, setInfo] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const sendInput = (e) => {
    e.preventDefault();
    console.log(info.username);
    console.log(info.fullname);
    console.log(info.email);
    console.log(info.password);
    console.log(info.phone);
    // }
  };
  const handleChangeUserName = (e) => {
    e.preventDefault();
    setInfo((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setInfo((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };
  const handleChangeEmail = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };
  const handleChangeFullname = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        fullname: e.target.value,
      };
    });
  };
  const handleChangePhone = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        phone: e.target.value,
      };
    });
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <form>
            {/* {inputs.map((input) => ( */}
            <div className="formInput">
              <label>username</label>
              <input
                type="text"
                placeholder=""
                value={info.username}
                onChange={handleChangeUserName}
              />
            </div>
            <div className="formInput">
              <label>fullname</label>
              <input
                type="text"
                placeholder=""
                value={info.fullname}
                onChange={handleChangeFullname}
              />
            </div>
            <div className="formInput">
              <label>email</label>
              <input
                type="email"
                placeholder=""
                value={info.email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="formInput">
              <label>password</label>
              <input
                type="password"
                placeholder=""
                value={info.password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="formInput">
              <label>phone</label>
              <input
                type="phone"
                placeholder=""
                value={info.phone}
                onChange={handleChangePhone}
              />
            </div>
            <div className="formInput">
              <button onClick={sendInput}>Send</button>
            </div>
          </form>
        </div>
        <div className="link">
          Already got an account : <Link to="/login"> Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default New;
