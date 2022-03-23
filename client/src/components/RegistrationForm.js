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
    setActive(!isActive);
  }

  const startMatch = () => {
    history.push('/')
  }

  const toProfile = () => {
    history.push('/profile')
  }

  return (
    <div className="register-div">
      <h1 className={isActive ? "active" : "inactive"}>Let's get to know you!</h1>

      <form onSubmit={handleSubmit} className={isActive ? "active" : "inactive"}>
        <label>What is your identity?</label>
        <select value={identity} onChange={registerIdentity}>
          <option value="heterosexual">Heterosexual</option>
          <option value="gay">Gay</option>
          <option value="lesbian">Lesbian</option>
        </select>

        <label>Type of relationship you are looking for?</label>
        <select value={relationship} onChange={registerRelationship}>
            <option value="Friendly">Friendly</option>
            <option value="Roamntic">Romantic</option>
            <option value="Serious">Serious</option>
          </select>

        <label>What are your preferences?</label>
        <select value={preference} onChange={registerPreference}>
          <option value="heterosexual">Heterosexual</option>
          <option value="gay">Gay</option>
          <option value="lesbian">Lesbian</option>
        </select>

        <input type="submit" value="Submit" />
      </form>

      <div id="secondary-prompt" className={isActive ? "inactive" : "active"}>
        <h1>Ready to mingle?</h1>
        
        <section>
          <button onClick={startMatch}>
            Get matched!
          </button>

          <button onClick={toProfile}>
            Continue building profile.
          </button>
        </section>
      </div>
    </div>
  )
}