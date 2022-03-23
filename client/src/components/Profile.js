import React, { useState } from "react"
import { Avatar } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ProfileButton from "./ProfileButton"
import "./profile.scss"

export default function Profile(props) {

  return (
    <main id="profile-main">
      <h1 className="profile-header">Profile</h1>

      <section className="profile-user">
        <Avatar alt="User profile picture" src="" sx={{ width: 56, height: 56 }}/>
        <h2 className="user-profile-name">John Doe</h2>
      </section>

      <section className="profile-nav">
        <List>
          <ProfileButton name="Gender" />
          <ProfileButton name="Preference" />
          <ProfileButton name="Settings" />
          <ProfileButton name="Logout" />
        </List>
      </section>
    </main>
  )
}