import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
// import "./login.scss";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from 'react-redux'
import { login, selectUser } from "../../storage/figures/user";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Typography, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "4px solid white",
  borderRadius: "15px",
  marginTop: '20px',
  width: '100%',
  transition: "opacity 0.2s",
  "&:focus-within": {
    opacity: 1,
  },
  "&:not(:focus-within)": {
    opacity: 0.4,
  },  
});

const StyledDivider = styled(Divider)({
  width: "2px",
  height: "30px",
  margin: "10px",
  backgroundColor: "white",
});

const StyledInputBase = styled(InputBase)({
  color: "white",
  flex: 1,
  fontWeight: 'bold',
});

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
      navigate('/')
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
        {user.login == -1 && <span>Password/Username incorrect, Try again !!!</span>}
        <div className="link">
          Do not have an account : <Link to="/users/new">Sign Up</Link>
        </div>
      </div>     
    </div>
  );
};

const Login1 = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setInfo({...info, [name]: value})
    user.login = 0
  }
  const _handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  };
  const handleSubmit = async () => {
      // await axios
      //   .post("http://localhost:8080/account/login", info)
      //   .then((req) => navigate("/"))
      //   .catch((err) => console.log("Wrong Account/Password"));
      // e.preventDefault() 
      dispatch(login(info))
      navigate('/')   
      console.log(info)
  }

  return (
  <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
    <div style={{marginTop: '15vh', marginBottom: '40px'}}>
    <Typography variant="h4">
      Login
    </Typography>
    </div>
    <form style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
    <StyledBox>
      <IconButton aria-label="email">
        <AccountCircleIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        placeholder="Email"
        name="email"
        value={info.email}
        onChange={handleChange}        
      />
    </StyledBox>   
    <StyledBox>
      <IconButton aria-label="password">
        <KeyIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        type="password" 
        placeholder="Password"
        name="password"
        value={info.password}
        onChange={handleChange}
        onKeyDown={_handleKeyDown}        
      />
    </StyledBox> 
    <div style={{width: '100%'}}>
    <Link 
      to="/forgot-password" 
      style = {{
        fontSize: "0.8rem",
        color: "#1A7FC1",
        float: "right",
        marginTop: "8px",
      }}
    >
      Forgot password?
    </Link>    
    </div>
    {user.login == -1 && <span>Password or Username incorrect, Try again !!!</span>}    
    <div style={{margin: '20px', width: '100%'}}>
      <Button 
        variant="contained" 
        style={{
          textTransform: 'none', 
          width: '90%',
          display: 'block',
          margin: 'auto',
          fontWeight: 'bold',
          borderRadius: "15px",
        }}
        onClick={handleSubmit}
        >
          Log in
      </Button>
    </div>
    </form> 
    <div>
      Don't have an account?<span> </span>
      <Link 
        to="/users/new" 
        style = {{
          color: "#1A7FC1",
        }}
      >
      Sign up
      </Link>         
    </div>
  </div>
  )
}

export default Login1
