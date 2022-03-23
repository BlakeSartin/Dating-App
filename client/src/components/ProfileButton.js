import React, { useState } from "react"
import { Button } from '@mui/material';

import "./profilebutton.scss"

export default function ProfileButton(props) {

  return (
    <Button 
      sx={{width: 350,
           height: 70,
           marginBottom: 5}}
      size="large"
      variant="contained"
    >
      {props.name}
    </Button>
  )
}