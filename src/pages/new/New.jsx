import "./new.scss";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, selectUser } from "../../storage/figures/user";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
// import "./new.scss";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "4px solid white",
  borderRadius: "15px",
  marginTop: "20px",
  width: "100%",
  minWidth: "300px",
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
  fontWeight: "bold",
});

const StyledFormHelperText = styled(FormHelperText)({
  float: "left",
  color: "hotpink",
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
    reEnterPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState(info);

  const user = useSelector(selectUser);
  const dispatcher = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // trim space input
    const trimmedInfo = Object.fromEntries(
      Object.entries(info).map(([key, value]) => [key, value.trim()])
    );
    const errors = {};
    // check empty input
    for (const [key, value] of Object.entries(trimmedInfo)) {
      if (value === "") {
        errors[key] = "This field cannot be empty";
      }
    }
    // check valid email
    if (!errors.email && !isValidEmail(trimmedInfo.email)) {
      errors.email = "Invalid email";
    }
    // check password and the re-entered one
    if (
      !errors.reEnterPassword &&
      trimmedInfo.reEnterPassword !== trimmedInfo.password
    ) {
      errors.reEnterPassword = "Password doesn't match";
    }
    if (Object.keys(errors).length === 0) {
      delete trimmedInfo.reEnterPassword;
      dispatcher(register(trimmedInfo));
      navigate("/");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
      }}
      // className="new"
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          alignItems: "center",
          width: "30%",
          minWidth: "300px",
          // border: "0.8px solid black",
          // borderRadius: "10px",
          // padding: "30px",
        }}
      >
        <div style={{ marginTop: "10px", marginBottom: "30px" }}>
          <Typography variant="h4">Register</Typography>
        </div>
        <StyledBox>
          <IconButton aria-label="username">
            <AccountCircleIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            placeholder="Username"
            name="username"
            value={info.username}
            onChange={handleChange}
            error={!!errors.username}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.username}</StyledFormHelperText>
        </div>
        <StyledBox>
          <IconButton aria-label="fullname">
            <AccountCircleIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            placeholder="Fullname"
            name="fullname"
            value={info.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.fullname}</StyledFormHelperText>
        </div>

        <StyledBox>
          <IconButton aria-label="email">
            <EmailIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            placeholder="Email"
            name="email"
            value={info.email}
            onChange={handleChange}
            error={!!errors.email}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.email}</StyledFormHelperText>
        </div>

        <StyledBox>
          <IconButton aria-label="password">
            <KeyIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            type="password"
            placeholder="Password"
            name="password"
            value={info.password}
            onChange={handleChange}
            error={!!errors.password}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.password}</StyledFormHelperText>
        </div>

        <StyledBox>
          <IconButton aria-label="re-enter-password">
            <KeyIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            type="password"
            placeholder="Confirm password"
            name="reEnterPassword"
            value={info.reEnterPassword}
            onChange={handleChange}
            error={!!errors.reEnterPassword}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.reEnterPassword}</StyledFormHelperText>
        </div>

        <StyledBox>
          <IconButton aria-label="phone">
            <PhoneIcon sx={{ color: "black" }} />
          </IconButton>
          <StyledDivider
            sx={{ color: "black" }}
            orientation="vertical"
            flexItem
          />
          <StyledInputBase
            sx={{ color: "black" }}
            placeholder="Phone number"
            name="phone"
            value={info.phone}
            onChange={handleChange}
            error={!!errors.phone}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.phone}</StyledFormHelperText>
        </div>

        <div style={{ margin: "20px", width: "100%" }}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              width: "90%",
              display: "block",
              margin: "auto",
              fontWeight: "bold",
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
            style={{
              color: "#1A7FC1",
            }}
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
