import React, { useEffect, useState } from "react";
import useRequireAuth from "../hooks/useRequireAuth";
import { Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, Avatar } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ConfirmationNumberOutlined, DirectionsBus } from "@mui/icons-material";

const Home = () => {
  useRequireAuth();

  const navigate = useNavigate();

  const [stops, setStops] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    setError("");
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    setError("");
  };

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axiosInstance.get("/stops");
        setStops(response.data.stops.sort((a, b) => a.id - b.id));
        setError("");
      } catch (error) {
        console.error("Fetch stops error:", error);
        setError("Error fetching stops");
      };
    };
    fetchStops();
  }, []);

  const handleBookNow = async () => {
    try {
      const response = await axiosInstance.post("/ticket", {
        origin: from,
        destination: to,
      });
      const ticket = response.data.ticket;
      navigate(`/ticket/${ticket}`);
    } catch (error) {
      console.error("Book now error:", error);
      setError(error.response.data.message);
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogout = () => {
    Cookies.remove("authtoken");
    Cookies.remove("refreshtoken");
    Cookies.remove("staff");
    navigate("/login");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      padding={2}
      width="100%"
    >
      <Paper>
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          paddingBlock={3}
          paddingInline={6}
          width={{
            xs: "100%",
            sm: 500,
          }}
          maxWidth={500}
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
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: 2
            }}
          >
            Logout
          </Button>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowGap={2}
            width="100%"
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 50,
                height: 50
              }}
            >
              <DirectionsBus sx={{ fontSize: 30 }} />
            </Avatar>
            <Typography variant="h4" align="center">
              Book a New Ticket
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              rowGap={2}
              maxWidth={500}
              paddingTop={2}
              paddingBottom={2}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor="from">
                  From
                </InputLabel>
                <Select
                  label="From"
                  value={from}
                  onChange={handleFromChange}
                >
                  {
                    stops.map((stop, index) => (
                      <MenuItem key={index} value={stop.name}>{stop.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="from">
                  To
                </InputLabel>
                <Select
                  label="To"
                  value={to}
                  onChange={handleToChange}
                >
                  {
                    stops.map((stop, index) => (
                      <MenuItem key={index} value={stop.name}>{stop.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookNow}
              disabled={from === to || !from || !to}
              fullWidth
              startIcon={<ConfirmationNumberOutlined />}
            >
              Book Now
            </Button>
            <Typography flexGrow={1} color="error">
              {error}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Home;