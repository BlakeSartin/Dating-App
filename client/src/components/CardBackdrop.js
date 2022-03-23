import React, { useState, useRef, useMemo, useEffect } from "react";
import { IconButton, Backdrop, Button } from "@mui/material";
import { ArrowDropDownCircle } from "@mui/icons-material";
import "./card_backdrop.scss";

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
        <ArrowDropDownCircle className="arrow_circle" size="large" />
      </IconButton>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <h4>{summary}</h4>
      </Backdrop>
    </div>
  );
}
