import React, { useState, useRef, useMemo, useEffect } from "react";
import { IconButton, Backdrop, Button } from "@mui/material";
import { ArrowDropDownCircle, VolunteerActivism} from "@mui/icons-material";
import "./matchbackdrop.scss";

export default function CardBackdrop({ summary, name }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={handleToggle}>
        <ArrowDropDownCircle className="arrow_circle" fontSize="large" sx={{ fontSize: 30 }} />
      </IconButton>
      <Backdrop
        sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={handleClose}
      >
        <h4 className="match"><VolunteerActivism /> Congrats!! We have found you a match!</h4>
      </Backdrop>
    </div>
  );
}
