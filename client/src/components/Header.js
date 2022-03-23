import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AccountBox, Chat, VolunteerActivism } from "@mui/icons-material";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import "./header.scss";

const header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <IconButton
            className="hand_heart"
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 5 }}
            >
              <Link to="/">
                <VolunteerActivism fontSize="large" sx={{ fontSize: 30 }}/>
              </Link>
            </IconButton>
          </Typography>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component="div"
            size="large"
            style={{ fontSize: 50 }}
            fontFamily="Snell Roundhand, cursive"
          >
            Q
          </Typography>
          <IconButton
          className="chat_bubble"
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/chat">
              <Chat fontSize="large" sx={{ fontSize: 30 }}/>
            </Link>
          </IconButton>
          <IconButton
          className="profile_cube"
            size="large"
            edge="start"
            aria-label="menu"
          >
            <Link to="/profile">
              <AccountBox fontSize="large" sx={{ fontSize: 30 }}/>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default header;
