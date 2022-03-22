import React, { useState, useRef, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Link } from "react-router-dom";
import { faUser, faHeartCirclePlus, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "./header.scss";

const header= () =>{
  return (
  <div className="navbar">
    <p>
      <Link to="/profile"><FontAwesomeIcon icon={faUser} size="lg"/></Link>
    </p>
    <p>
      <Link to="/"><FontAwesomeIcon icon={faHeartCirclePlus} size="lg"/></Link>
    </p>
    <p>
      <Link to="/chat"><FontAwesomeIcon icon={faCommentDots} size="lg"/></Link>
    </p>
  </div>
  );
}
export default header;