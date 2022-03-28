import React from "react";
import {IconButton, Backdrop} from "@mui/material";
import {VolunteerActivism, ArrowDropDownCircle} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBeat } from "@fortawesome/free-solid-svg-icons";
import "./matchbackdrop.scss";

export default function MatchBackdrop({ summary, name }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
       <IconButton onClick={handleToggle} className="heart_pulse">
       <FontAwesomeIcon  icon={faHeart} beat color="pink" size="3x"/>
        </IconButton>
      <Backdrop
        sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={handleClose}
      >
        <h4 className="match"><VolunteerActivism /> You can match with {name}!!</h4>
      </Backdrop>
    </div>
  );
}
