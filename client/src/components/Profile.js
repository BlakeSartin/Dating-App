import React, { useState } from "react"

import ProfileButton from "./ProfileButton"

export default function Profile(props) {

  return (
    <main>
      <h1 className="profile-header">Profile</h1>

      <img src="" alt="user profile photo" />
      <h2 className="user-profile-name">John Doe</h2>

      <ProfileButton name="Placeholder"/>
      <ProfileButton name="Update Preferences"/>
      <ProfileButton name="Settings"/>
      <ProfileButton name="Logout"/>
    </main>
  )
}