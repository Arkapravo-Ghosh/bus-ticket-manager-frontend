import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Paper, Avatar, Checkbox, FormControlLabel, InputAdornment, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LockOutlined, Login as LoginIcon, Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    console.log("Remember me:", e.target.checked);
  };

  const handleEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  useEffect(() => {
    setDisableLogin(!(email && password));
  }, [email, password]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required");
      console.error("Email and password are required");
      if (!email) {
        setEmailError(true);
      };
      if (!password) {
        setPasswordError(true);
      };
      return;
    };
    // Create an axios instance
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    // Send email and password data to "/login" endpoint
    axiosInstance.post("/login", { email, password })
      .then(response => {
        console.log("Login successful:", response.data);
        // Set cookies for authtoken and refreshtoken
        if (rememberMe) {
          Cookies.set("authtoken", response.data.authtoken, { expires: 30 });
          Cookies.set("refreshtoken", response.data.refreshtoken, { expires: 30 });
          Cookies.set("staff", "true", { expires: 30 });
        } else {
          Cookies.set("authtoken", response.data.authtoken);
          Cookies.set("refreshtoken", response.data.refreshtoken);
          Cookies.set("staff", "true");
        };
        // Redirect to "/"
        navigate("/");
      })
      .catch(error => {
        console.error("Login error:", error);
        setError("Invalid email or password");
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      padding={2}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        width="50"
        height="50"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          margin: 10
        }}
      />
      <Paper>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap={2}
          width="100%"
          paddingBlock={3}
          paddingInline={6}
          maxWidth={500}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowGap={2}
            width="100%"
          >
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 50,
                  height: 50
                }}
              >
                <LockOutlined sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "normal" }}
                color="text.secondary"
              >
                Sign In
              </Typography>
            </Grid>
            <Typography variant="h4" align="center">
              Welcome to Bus Ticket Manager
            </Typography>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                itemType="email"
                required
                error={emailError}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth margin="normal"
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                required
                error={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Grid
                  item
                  alignSelf="flex-start"
                  width="100%"
                  paddingBottom={3}
                >
                  <FormControlLabel
                    control={<Checkbox checked={rememberMe} />}
                    label={
                      <Typography variant="body2" color="GrayText">
                        Remember Me
                      </Typography>
                    }
                    onChange={handleRememberMe}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                color={error ? "error" : "primary"}
                disabled={disableLogin}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Grid>
            {
              error &&
              <Typography color="error">
                {error}
              </Typography>
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;