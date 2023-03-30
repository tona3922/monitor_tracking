import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import "./login.scss";

import { useSelector, useDispatch } from 'react-redux'
import { login, selectUser } from "../../storage/figures/user";

const Login = () => {

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUserName = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const handleChangePassword = (e) => {
    setInfo((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };
  const _handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      // await axios
      //   .post("http://localhost:8080/account/login", info)
      //   .then((req) => navigate("/"))
      //   .catch((err) => console.log("Wrong Account/Password"));
      // e.preventDefault() 
      dispatch(login(info))
    }
  };
  return (
    <div className="mysite">
      <div className="form">
        <div className="title">Log in</div>
        <div className="info">
          <div className="input">
            <div className="input_title">Email/Username</div>
            <input
              type="text"
              value={info.username}
              onChange={handleChangeUserName}
            />
          </div>
          <div className="input">
            <div className="input_title">Password</div>
            <input
              type="password"
              value={info.password}
              onChange={handleChangePassword}
              onKeyDown={_handleKeyDown}
            />
          </div>
        </div>

        <div className="link">
          Do not have an account : <Link to="/users/new">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
