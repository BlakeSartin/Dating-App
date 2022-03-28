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
        <Toolbar className="navbar">
          <Typography sx={{ mr: 2 }}/>
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
          <Typography variant="h6" component="div">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              
            >
              <Link to="/">
                <VolunteerActivism className="hand_heart" fontSize="large" sx={{ fontSize: 30 }}/>
              </Link>
            </IconButton>
          </Typography>
          
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
          >
            <Link to="/chat">
              <Chat className="chat_bubble" fontSize="large" sx={{ fontSize: 30 }}/>
            </Link>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
          >
            <Link className="profile_cube" to="/profile">
              <AccountBox fontSize="large" sx={{ fontSize: 30 }}/>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default header;
