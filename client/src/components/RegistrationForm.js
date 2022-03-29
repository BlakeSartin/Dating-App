import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom"
import { userContext } from "../providers/UserProvider";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";
import RegisterListItem from "./RegisterListItem";
import "./registrationForm.scss"

export default function RegistrationForm(props) {
  const { user, setUser } = useContext(userContext);
  const history = useHistory();

  const [gender, setGender] = useState([])
  const [relationship, setRelationship] = useState([])
  const [orientation, setOrientation] = useState([])
  const [isActive, setActive] = useState("false");

  const [gen, setGen] = useState()
  const [rel, setRel] = useState()
  const [ori, setOri] = useState()

  const [style, setStyle] = useState("animate1");
  const [style2, setStyle2] = useState("animate2");
  const [style3, setStyle3] = useState("animate3");

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
    setStyle("animate1 selected");
  }

  const orientationOnChange = (event) => {
    setOri(event.target.value);
    setStyle2("animate2 selected");
  }

  const preferenceOnChange = (event) => {
    setRel(event.target.value);
    setStyle3("animate3 selected");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(gen === undefined || rel === undefined || ori === undefined) {
      alert("Please fill out the form");
    } else {
      user.gender_identity = [parseInt(gen)];
      user.sexual_orientation = [parseInt(ori)];
      user.relationship_preference = [parseInt(rel)];
      setActive(!isActive);
    }
  }

  const startMatch = () => {
    history.push('/')
  }

  const toProfile = () => {
    history.push('/profile')
  }

  return (
   
    <div className="register-div">
       <Box sx={{ flexGrow: 1 }}>
         
      <AppBar sx={{ top: 'auto', bottom: 0 }} position="relative">
        <Toolbar className="navbar">
          <Typography/>
        <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component="div"
            size="large"
            style={{ fontSize: 50 }}
            fontFamily="Snell Roundhand, cursive"
          >
             <Container className="logo">
            Querry
            </Container>
          </Typography>
          
          </Toolbar>
          </AppBar>
         
          </Box>
      <h1 className={isActive ? "active" : "inactive"}>Let's get to know you!</h1>

      <form onSubmit={handleSubmit} className={isActive ? "active" : "inactive"}>
        <label className="animate1">What is your gender?</label>
        <select className={style} onChange={genderOnChange}>
          <option disabled selected value> -- select an option -- </option>
          <RegisterListItem o={gender}/>
        </select>

        <label className="animate2">What is your orientation?</label>
        <select className={style2} onChange={orientationOnChange}>
          <option disabled selected value> -- select an option -- </option>
          <RegisterListItem o={orientation}/>
          </select>

        <label className="animate3" >Relationship Preference?</label>
        <select className={style3} onChange={preferenceOnChange}>
          <option disabled selected value> -- select an option -- </option>
          <RegisterListItem o={relationship}/>
        </select>

        <input className="animate4" type="submit" value="Submit" />
      </form>

      <div id="secondary-prompt" className={isActive ? "inactive" : "active"}>
        <h1>Ready to mingle?</h1>
        
        <section>
          <button onClick={startMatch} className="animate5">
            Get matched!
          </button>

          <button onClick={toProfile} className="animate1">
            Continue building profile.
          </button>
        </section>
      </div>
    </div>
  )
}