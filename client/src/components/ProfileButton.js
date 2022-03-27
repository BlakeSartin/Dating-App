import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import GenderListItem from "./GenderListItem";
import OrientationListItem from "./OrientationListItem";
import RelationshipListItem from "./RelationListItem";
import OriPrefListItem from "./OriPrefListItem";
import GenPrefListItem from "./GenPrefListItem";
import "./profilebutton.scss";

export default function ProfileButton(props) {
  const [state, setState] = useState({ top: false });
  const [gender, setGender] = useState([]);
  const [genderPref, setGenderPref] = useState([]);
  const [orientation, setOrientation] = useState([]);
  const [orientationPref, setOrientationPref] = useState([]);
  const [relationship, setRelationship] = useState([]);

  // function to save user profile setting to database
  // takes 2 string to indicate the route and anchor
  const saveProfile = (route) => {
    axios
      .post(`/api/users/${route}`, {
        user_id: props.u.id,
        gender_identity: props.u.gender_identity,
        gender_preference: props.u.gender_preference,
        sexual_orientation: props.u.sexual_orientation,
        orientation_preference: props.u.orientation_preference,
      })
      .then((result) => {
        console.log(result);
      });
  };

  // submit handlers
  const handleSubmitGender = (event) => {
    console.log("handling sumbit");
    event.preventDefault();
    saveProfile("genderidentity");
  };
  const handleSubmitGenderPref = (event) => {
    console.log("gender pref submit");
    event.preventDefault();
    saveProfile("genderpreference");
  };
  const handleSubmitOrientation = (event) => {
    console.log("orientation submit");
    event.preventDefault();
    saveProfile("sexualorientation");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const checkBox = (event) => {
    console.log(event.target);
  };

  useEffect(() => {
    axios.get("api/genders").then((res) => {
      const g = res.data;
      setGender(g);
      setGenderPref(g);
    });
  }, []);

  useEffect(() => {
    axios.get("api/orientations").then((res) => {
      const o = res.data;
      setOrientation(o);
      setOrientationPref(o);
    });
  }, []);

  useEffect(() => {
    axios.get("api/relationships").then((res) => {
      const r = res.data;
      setRelationship(r);
    });
  }, []);

  const list = (anchor) =>
    props.name === "Gender" ? (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={(event) => checkBox(event)}
      >
        <List>
          <GenderListItem g={gender} ug={props.u.gender_identity} />
        </List>

        <form onSubmit={handleSubmitGender}>
          <div id="g-list-btns">
            <button
              type="submit"
              className="gender-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Save
            </button>
            <button
              className="gender-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    ) : props.name === "Orientation" ? (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <OrientationListItem
            o={orientation}
            uo={props.u.sexual_orientation}
          />
        </List>
        <form onSubmit={handleSubmitOrientation}>
          <div id="o-list-btns">
            <button
              type="submit"
              className="orientation-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Save
            </button>
            <button
              className="orientation-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    ) : props.name === "Gender Preference" ? (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <GenPrefListItem g={genderPref} ug={props.u.gender_preference} />
        </List>
        <form onSubmit={handleSubmitGenderPref}>
          <div id="g-list-btns">
            <button
              type="submit"
              className="orientation-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Save
            </button>
            <button
              className="orientation-list-btn"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    ) : props.name === "Orientation Preference" ? (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <OriPrefListItem
            o={orientationPref}
            uo={props.u.orientation_preference}
          />
        </List>
        <div id="o-list-btns">
          <button
            className="orientation-list-btn"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Save
          </button>
          <button
            className="orientation-list-btn"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Cancel
          </button>
        </div>
      </Box>
    ) : (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <RelationshipListItem
            r={relationship}
            rp={props.u.relationship_preference}
          />
        </List>
        <div id="o-list-btns">
          <button
            className="orientation-list-btn"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Save
          </button>
          <button
            className="orientation-list-btn"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Cancel
          </button>
        </div>
      </Box>
    );

  return (
    <ListItem
      sx={{
        bgcolor: "#1976d2",
        borderRadius: 1.5,
        color: "white",
        marginBottom: 3,
        width: 320,
      }}
    >
      {["bottom"].map((anchor) => (
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
  );
}
