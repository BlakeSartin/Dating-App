import React, { useState, useRef, useMemo, useEffect } from "react";
import { IconButton, Backdrop, Button } from "@mui/material";
import { ArrowDropDownCircle } from "@mui/icons-material";
import "./card_backdrop.scss";

export default function CardBackdrop({
  summary,
  genderIdentity,
  sexualOrientation,
}) {
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
        <ArrowDropDownCircle
          className="arrow_circle"
          fontSize="large"
          sx={{ fontSize: 30 }}
        />
      </IconButton>
      <Backdrop
        sx={{ color: "aquamarine", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <h4 className="backdrop_text">
          |
          {genderIdentity.map((e) => {
            return " " + e + " |";
          })}
        </h4>
        <h4 className="backdrop_text">
          |
          {sexualOrientation.map((e) => {
            return " " + e + " |";
          })}
        </h4>
        <h4 className="backdrop_text">{summary}</h4>
      </Backdrop>
    </div>
  );
}
