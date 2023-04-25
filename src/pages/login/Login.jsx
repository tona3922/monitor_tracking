import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
// import "./login.scss";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { readData, login, selectUser } from "../../storage/figures/user";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Typography, Button, FormHelperText } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import "./login.scss";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "4px solid white",
  borderRadius: "15px",
  marginTop: "20px",
  width: "100%",
  backgroundColor: "black",
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
  backgroundColor: "black",
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

const Login1 = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(info);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  const _handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    // await axios
    //   .post("http://localhost:8080/account/login", info)
    //   .then((req) => navigate("/"))
    //   .catch((err) => console.log("Wrong Account/Password"));
    // e.preventDefault()
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
    if (Object.keys(errors).length === 0) {
      dispatch(login(info));
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
      className="mysite"
    >
      <form
        style={{
          display: "flex",
          marginTop: "200px",
          flexDirection: "column",
          alignItems: "center",
          width: "30%",
          minWidth: "300px",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
        className="form"
      >
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <Typography
            sx={{
              height: "50px",
              fontSize: "35px",
              fontWeight: "bold",
              color: "white",
            }}
            variant="h4"
          >
            Login
          </Typography>
        </div>
        <StyledBox sx={{ borderColor: "black" }}>
          <IconButton aria-label="email">
            <EmailIcon sx={{ color: "white" }} />
          </IconButton>
          <StyledDivider orientation="vertical" flexItem />
          <StyledInputBase
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

        <StyledBox sx={{ borderColor: "black" }}>
          <IconButton aria-label="password">
            <KeyIcon sx={{ color: "white" }} />
          </IconButton>
          <StyledDivider orientation="vertical" flexItem />
          <StyledInputBase
            type="password"
            placeholder="Password"
            name="password"
            value={info.password}
            onChange={handleChange}
            onKeyDown={_handleKeyDown}
            error={!!errors.password}
          />
        </StyledBox>
        <div style={{ width: "90%" }}>
          <StyledFormHelperText>{errors.password}</StyledFormHelperText>
        </div>
        <div style={{ width: "100%" }}>
          <Link
            to="/forgot-password"
            style={{
              fontSize: "0.8rem",
              color: "white",
              float: "right",
              marginTop: "8px",
            }}
          >
            Forgot password?
          </Link>
        </div>
        {user.login === -1 && (
          <div style={{ textAlign: "center", color: "hotpink" }}>
            Incorrect Username/Password, Try again !!!
          </div>
        )}
        <div style={{ margin: "20px", width: "100%" }}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              width: "90%",
              display: "block",
              margin: "auto",
              fontWeight: "bold",
              fontSize: "20px",
              borderRadius: "15px",
            }}
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </div>
        <div style={{ fontSize: "20px" }}>
          Don't have an account?<span> </span>
          <Link
            to="/users/register"
            style={{
              color: "#fdfffc",
              fontSize: "20px",
            }}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login1;
