import React, { useState, useRef, useMemo, useEffect } from "react";
import {  Link } from "react-router-dom";
import { AccountBox, Chat, VolunteerActivism  } from "@mui/icons-material";
import "./header.scss";

const header= () =>{
  return (
  <div className="navbar">
    <p>
      <Link to="/profile"><AccountBox /></Link>
    </p>
    <p>
      <Link to="/"><VolunteerActivism /></Link>
    </p>
    <p>
      <Link to="/chat"><Chat /></Link>
    </p>
  </div>
  );
}
export default header;