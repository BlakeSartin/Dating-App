import React, { useState, Fragment } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import GenderListItem from './GenderListItem';
import "./profilebutton.scss"

export default function ProfileButton(props) {
  const genderTest = [
    "Woman",
    "Man",
    "Agender",
    "Androgynous",
    "Bigender",
    "Cis Man",
    "Cis Woman",
    "Genderfluid",
    "Genderqueer",
    "Gender Nonconforming",
    "Hijra",
    "Intersex",
    "Non-binary",
    "Other gender",
    "Pangender",
    "Transfeminine",
    "Transgender",
    "Trans Man",
    "Transmasculine",
    "Transsexual",
    "Trans Woman",
    "Two Spirit",
  ];

  const [state, setState] = useState({top: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const checkBox = (event) => {
    console.log(event.target)
  }

  const list = (anchor) => (
    props.name === "Gender" ? 
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={(event) => checkBox(event)}
    >
      <List>
        <GenderListItem g={genderTest}/>
      </List>
      <div id="g-list-btns">
        <button
          className="gender-list-btn" 
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>Save</button>
        <button
          className="gender-list-btn" 
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>Cancel</button>
      </div>
    </Box>
    
     :
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key="hello">
            <ListItemText primary="This is preferences" />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <ListItem sx={{
      bgcolor: "#1976d2",
      borderRadius: 1.5,
      color: "white",
      marginBottom: 3,
      width: 320
      }}>
      {['bottom'].map((anchor) => (
        <Fragment key={anchor}>
        <ListItemButton onClick={toggleDrawer(anchor, true)}>
          <ListItemText primary={props.name} />
        </ListItemButton>

        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </Fragment>
      ))}

    </ListItem>
  )
}