import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import { userContext } from "../providers/UserProvider";

import RegisterListItem from "./RegisterListItem";
import "./registrationForm.scss"

export default function RegistrationForm(props) {
  const { user, setUser } = useContext(userContext);
  const history = useHistory();

  const [gender, setGender] = useState([])
  const [relationship, setRelationship] = useState([])
  const [orientation, setOrientation] = useState([])
  const [isActive, setActive] = useState("false");

  const [gen, setGen] = useState("")
  const [rel, setRel] = useState("")
  const [ori, setOri] = useState("")

  useEffect(() => {
    axios.get('api/genders').then((res) => {
      const g = res.data;
      setGender(g);
    })
  }, []);

  useEffect(() => {
    axios.get('api/orientations').then((res) => {
      const g = res.data;
      setOrientation(g);
    })
  }, []);

  useEffect(() => {
    axios.get('api/relationships').then((res) => {
      const g = res.data;
      setRelationship(g);
    })
  }, []);
  

  const genderOnChange = (event) => {
    setGen(event.target.value);
  }

  const orientationOnChange = (event) => {
    setOri(event.target.value);
  }

  const preferenceOnChange = (event) => {
    setRel(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    user.gender_identity = [parseInt(gen)];
    user.sexual_orientation = [parseInt(ori)];
    user.relationship_preference = [parseInt(rel)];
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
        <label>What is your gender?</label>
        <select onChange={genderOnChange}>
          <RegisterListItem o={gender}/>
        </select>

        <label>What is your orientation?</label>
        <select onChange={orientationOnChange}>
          <RegisterListItem o={orientation}/>
          </select>

        <label>Relationship Preference?</label>
        <select onChange={preferenceOnChange}>
          <RegisterListItem o={relationship}/>
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