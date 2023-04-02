import "./new.scss";

import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { register, selectUser } from "../../storage/figures/user"
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Typography, Button } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import PhoneIcon from '@mui/icons-material/Phone';

const New = ({ inputs }) => {
  const [info, setInfo] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
  })

  const user = useSelector(selectUser)
  const dispatcher = useDispatch()

  const navigate = useNavigate()

  const sendInput = (e) => {
    e.preventDefault();
    dispatcher(register(info))
    navigate('/users/new')
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
          Already got an account?
          <Link to="/login"> Log in</Link>
        </div>
      </div>
    </div>
  );
};

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "4px solid white",
  borderRadius: "15px",
  marginTop: '20px',
  width: '100%',
  minWidth: '300px',
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

const StyledFormHelperText = styled(FormHelperText)({
  float: 'left', 
  color: 'hotpink'
});

function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const Register = () => {
  const [info, setInfo] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
  })
  const [errors, setErrors] = useState(info) 

  const user = useSelector(selectUser)
  const dispatcher = useDispatch()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setInfo({...info, [name]: value})
    if (errors[name]) {
      setErrors({...errors, [name]: ""})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // trim space input
    const trimmedInfo = Object.fromEntries(Object.entries(info).map(([key, value]) => [key, value.trim()]))
    const errors = {}
    // check empty input
    for (const [key, value] of Object.entries(trimmedInfo)) {
      if (value === '') {
        errors[key] = 'This field cannot be empty';
      }
    }    
    console.log(errors)
    // check valid email
    if (errors.email === null && !isValidEmail(trimmedInfo.email)) {
      errors.email = 'Invalid email'
    }
    if (Object.keys(errors).length === 0) {
      dispatcher(register(trimmedInfo))
      navigate('/users/new')
    } else {
      setErrors(errors)
    }
  }

  return (
  <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
    <form style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: '30%', minWidth: '300px'}}>
    <div style={{marginTop: '8vh', marginBottom: '30px'}}>
    <Typography variant="h4">
      Register
    </Typography>
    </div>      
    <StyledBox>
      <IconButton aria-label="username">
        <AccountCircleIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        placeholder="Username"
        name="username"
        value={info.username}
        onChange={handleChange}
        error={!!errors.username}
      />
    </StyledBox> 
    <div style={{width: '90%'}}><StyledFormHelperText>{errors.username}</StyledFormHelperText></div>
    <StyledBox>
      <IconButton aria-label="fullname">
        <AccountCircleIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        placeholder="Fullname"
        name="fullname"
        value={info.fullname}
        onChange={handleChange}
        error={!!errors.fullname}
      />
    </StyledBox> 
    <div style={{width: '90%'}}><StyledFormHelperText>{errors.fullname}</StyledFormHelperText></div>

    <StyledBox>
      <IconButton aria-label="email">
        <EmailIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        placeholder="Email"
        name="email"
        value={info.email}
        onChange={handleChange}
        error={!!errors.email}
      />
    </StyledBox> 
    <div style={{width: '90%'}}><StyledFormHelperText>{errors.email}</StyledFormHelperText></div>
  
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
        error={!!errors.password}
      />
    </StyledBox> 
    <div style={{width: '90%'}}><StyledFormHelperText>{errors.password}</StyledFormHelperText></div>

    <StyledBox>
      <IconButton aria-label="phone">
        <PhoneIcon sx={{ color: "white" }} />
      </IconButton>
      <StyledDivider orientation="vertical" flexItem/>
      <StyledInputBase 
        placeholder="Phone number"
        name="phone"
        value={info.phone}
        onChange={handleChange}
        error={!!errors.phone}
      />
    </StyledBox> 
    <div style={{width: '90%'}}><StyledFormHelperText>{errors.phone}</StyledFormHelperText></div>
             
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
          Sign up
      </Button>
    </div>
    <div>
      Already have an account?<span> </span>
      <Link 
        to="/" 
        style = {{
          color: "#1A7FC1",
        }}
      >
      Log in
      </Link>         
    </div>    
    </form> 
  </div>
  )
}

export default Register