import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./registrationForm.scss"

export default function RegistrationForm(props) {
  const history = useHistory();

  const [identity, setIdentity] = useState("")
  const [relationship, setRelationship] = useState("")
  const [preference, setPreference] = useState("")
  const [isActive, setActive] = useState("false");

  const registerIdentity = (event) => {
    setIdentity(event.target.value)
  }

  const registerRelationship = (event) => {
    setRelationship(event.target.value)
  }

  const registerPreference = (event) => {
    setPreference(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`1: ${identity} 2: ${relationship} 3: ${preference}`)
    setActive(!isActive);
  }

  const startMatch = () => {
    history.push('/')
  }

  const toProfile = () => {
    history.push('/profile')
  }

  return (
    <div>
      <h1 className={isActive ? "active" : "inactive"}>Let's get to know you!</h1>

      <form onSubmit={handleSubmit} id="first-prompt" className={isActive ? "active" : "inactive"}>
        <label>
          What is your identity?
          <select value={identity} onChange={registerIdentity}>
            <option value="heterosexual">Heterosexual</option>
            <option value="gay">Gay</option>
            <option value="lesbian">Lesbian</option>
          </select>
        </label>

        <label>
          What type of relationship are you looking for?
          <select value={relationship} onChange={registerRelationship}>
            <option value="Friendly">Friendly</option>
            <option value="Roamntic">Romantic</option>
            <option value="Serious">Serious</option>
          </select>
        </label>

        <label>
          What are your preferences?
          <select value={preference} onChange={registerPreference}>
            <option value="heterosexual">Heterosexual</option>
            <option value="gay">Gay</option>
            <option value="lesbian">Lesbian</option>
          </select>
        </label>

        <input type="submit" value="Submit" />
      </form>

      <div id="secondary-prompt" className={isActive ? "inactive" : "active"}>
        <h1>Ready to mingle?</h1>
        <button onClick={startMatch}>
          Get matched!
        </button>

        <button onClick={toProfile}>
          Continue building profile.
        </button>
      </div>
    </div>
  )
}