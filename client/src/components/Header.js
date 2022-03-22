import React, { useState, useRef, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Link } from "react-router-dom";
import { faUser, faHeartCirclePlus, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const header= () =>{
  return (
  <div>
    <li>
      <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
    </li>
    <li>
      <Link to="/"><FontAwesomeIcon icon={faHeartCirclePlus} /></Link>
    </li>
    <li>
      <Link to="/chat"><FontAwesomeIcon icon={faCommentDots} /></Link>
    </li>
  </div>
  );
}
export default header;