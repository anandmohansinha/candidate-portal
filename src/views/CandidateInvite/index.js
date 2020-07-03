import React, { Component, useState } from "react";

// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import endPoint from '../../variables/app.url'

//import InviteCandidate from './index - Copy';

let domainNameUrl = `${endPoint.serviceEndPoint}assessments`;

let url = `${endPoint.serviceEndPoint}registerCandidateScheduleAssessment`;


class InviteCandidate extends React.Component {

  //setState({comment: 'Hello'});

 

  state = {
    domains: [],
    selectedTeam: "",
    validationError: "",
    email:"",
    name:""

  };

  componentDidMount() {
    fetch(
      domainNameUrl
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.assessments);
        let domainsFromApi = data.assessments.map(team => {
          return { value: team.id, display: team.name };
        });
       
        this.setState({
          domains: [
            {
              value: "",
              display:
                "Select Domain Name"
            }
          ].concat(domainsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  handleSendInvitation() {
    //event.preventDefault();
    var data ={
        "candidate" : {
         "emailAddress" : this.state.email,
         "firstName" : this.state.name
       },
       "candidateAssessment" : {
           "assessment" : {
               "id" : this.state.selectedTeam
           }
       }
   }

   //console.log(data);

   if(this.state.email === "" || this.state.name === "" || this.state.selectedTeam ===""){
      alert("Please fill all details first");
   }else{
    fetch(url, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify(data)
      }).then((res)=>res.json())
        .then(() =>{
         alert("Mail send successfully");

         document.getElementById("email").value = "";
         document.getElementById("name").value = "";
         document.getElementById("domain-id").value = "";
         this.state.email = "";
         this.state.name = "";
         this.state.selectedTeam = "";
       
      })
     
   }
       
    
  }; 

  render() {
       
    return (
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.classes}>
        {/* <form onSubmit={this.handleSendInvitation} className={this.classes}> */}
        <form className={this.classes}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"         
            onChange={(e)=>{this.state.email = e.target.value}}         
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            onChange={(e)=>{this.state.name = e.target.value}}
            autoComplete="off"
          />


           <div>
              <select
               id = "domain-id"
                value={this.state.selectedTeam}
                onChange={e =>
                  this.setState({
                    selectedTeam: e.target.value,
                    validationError:
                      e.target.value === ""
                        ? "You must select domain name"
                        : ""
                  })
                  
                }
                className="form-control"
              >
                {this.state.domains.map(team => (
                  <option
                    key={team.value}
                    value={team.value}
                  >
                    {team.display}
                  </option>
                ))}
              </select>
              <div
                style={{
                  color: "red",
                  marginTop: "5px"
                }}
              >
                {this.state.validationError}
               {/*  {this.state.selectedTeam} */}
              </div>
          </div>
             
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={this.classes}
            onClick={()=>this.handleSendInvitation()}
          >
            Send Invite
              </Button>
        {/* <Button color="primary" type="submit">Send Invite</Button> */}
        </form>
      </div>
    </Container>

    );
  }
}

export default InviteCandidate;