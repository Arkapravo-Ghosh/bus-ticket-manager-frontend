import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { DeleteForever, Home } from "@mui/icons-material";
import axiosInstance from "../utils/axios";
import QRCode from "qrcode";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const basename = import.meta.env.BASE_URL;

  const ticketId = location.pathname.replace(basename, "").split("/")[1];

  const staff = Cookies.get("staff");

  const [ticketExists, setTicketExists] = useState(false);

  const [ticket, setTicket] = useState({});

  const [rows, setRows] = useState([]);

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const checkTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/${ticketId}`);
        if (response.status === 200) {
          setTicket(response.data.ticket);
          setTicketExists(true);
        } else {
          setTicket({});
          setTicketExists(false);
        };
      } catch (error) {
        setTicket({});
        setTicketExists(false);
      };
    };
    checkTicket();
  }, [ticketId]);

  useEffect(() => {
    if (ticket) {
      setRows([
        ["Origin", ticket.origin],
        ["Destination", ticket.destination],
        ["Time", new Date(ticket.created_at).toLocaleString("en-GB")],
      ]);
    };
  }, [ticket]);

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleExpireButton = async () => {
    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/ticket/${ticketId}`);
      if (response.status === 200) {
        navigate("/");
      };
    } catch (error) {
      console.error("Expire ticket error:", error);
    };
  };

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = `${window.location.origin}${location.pathname}`;
        const qrCode = await QRCode.toDataURL(url);
        setQrCode(qrCode);
      } catch (error) {
        console.error("Generate QR code error:", error);
      };
    };
    generateQrCode();
  }, [ticketId, location.pathname]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      paddingInline={2}
    >

      <Grid
        container
        item
        paddingBlock={2}
        position="absolute"
        top={0}
        width="100vw"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
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
        {
          staff === "true" && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Home />}
              onClick={handleHomeButton}
              sx={{
                marginRight: 2,
              }}
            >
              <Typography variant="button">
                Home
              </Typography>
            </Button>
          )
        }
      </Grid>
      <Paper elevation={3}>
        {ticketExists ? (
          <>
            <Grid
              container
              item
              flexDirection="column"
              justifyContent="center"
              paddingBlock={3}
              paddingInline={6}
              rowSpacing={2}
              alignItems="center"
              maxWidth={500}
            >
              <Typography variant="h4" paddingBlock={2}>
                Ticket
              </Typography>
              <TableContainer
                component={Table}
                sx={{
                  backgroundColor: "skyblue",
                }}
              >
                <TableBody>
                  {
                    rows.map(
                      (row, index) => (
                        <TableRow key={index}>
                          <TableCell width={100}>
                            <Typography variant="body1">
                              {row[0]}
                            </Typography>
                          </TableCell>
                          <TableCell width={200}>
                            <Typography variant="body1">
                              {row[1]}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
              </TableContainer>
            </Grid>

            <Grid
              container
              item
              paddingBottom={3}
              gap={2}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <img src={qrCode} alt="QR code" />
              {
                staff === "true" && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForever />}
                    onClick={handleExpireButton}
                  >
                    <Typography variant="button">
                      Expire
                    </Typography>
                  </Button>
                )
              }
            </Grid>
          </>
        ) : (
          <Grid
            container
            item
            paddingBlock={3}
            paddingInline={6}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            rowGap={2}
            width="100%"
          >
            <Typography variant="h4">
              Ticket not found
            </Typography>
          </Grid>
        )
        }
      </Paper>
    </Grid>
  );
};

export default Ticket;