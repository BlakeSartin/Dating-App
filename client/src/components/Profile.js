import React, { useState, useContext } from "react";
import { Avatar } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import ProfileButton from "./ProfileButton";
import "./profile.scss";

//importing context
import { userContext } from "../providers/UserProvider";

export default function Profile(props) {
  const { user } = useContext(userContext);

  return (
    <main id="profile-main">
      <h1 className="profile-header">Profile</h1>

      <section className="profile-user">
        <Avatar
          alt="User profile picture"
          src={user.avatar}
          sx={{ width: 56, height: 56 }}
        />
        <h2 className="user-profile-name">
          {user.first_name} {user.last_name}
        </h2>
      </section>

      <section className="profile-nav">
        <List>
          <ProfileButton name="Gender" u={user} />
          <ProfileButton name="Orientation" u={user} />
          <ProfileButton name="Gender Preference" u={user} />
          <ProfileButton name="Orientation Preference" u={user} />
          <ProfileButton name="Preferred Relationship" u={user} />
        </List>
      </section>
    </main>
  );
}
