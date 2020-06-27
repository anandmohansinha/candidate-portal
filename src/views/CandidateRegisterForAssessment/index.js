import React, { Component, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import endPoint from '../../variables/app.url';
import style from './style.module.css';

import avatar from "assets/img/faces/marc.jpg";

//AD
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function ShowInstructions(props) {
  return (
    <div style={{ margin: "0 20px" }}>
      <GridContainer>
        <GridItem>
          <Card>
            <CardHeader>
              <div className={style.display_flex}>
                <div className={style.float_left, style.w_50}>
                  TEST DETAILS
                </div>
                <div className={style.float_right, style.display_flex}>
                  <div className={style.float_left, style.header_border}>Total no. of Questions: 10</div>
                  <div className={style.float_right, style.header_border}>Total Duration: 60mins</div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className={style.font_bold}>
                THINGS TO REMEMBER
              </div>
              <GridContainer>
                <GridItem className={style.w_100}>
                  <div >
                    <ol>
                      <li>
                        Before starting the test, please close all chat windows, screen-saver(s), etc. and make sure that you have a stable internet connection.
                    </li>
                      <li>
                        Pressing F5 at any time during the test will cause it to end immediately.
                    </li>
                      <li>
                        If your computer system shuts down suddenly due to your power supply being disconnected, you can resume the test from the same question that you were attempting earlier.
                        All your previous answers are already saved.
                    </li>
                      <li>
                        Your test will open in a newpopup window once you press the launch test button.
                    </li>
                      <li>
                        When resuming, please start the test as you did before and use the same registration details.
                    </li>
                    </ol>
                    <div className={style.float_right}>
                      <Button color="primary" onClick={props.onClick}>Proceed</Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}

function RegisterForAssessment() {

  //AD
  
  let urlLoc = window.location.href;
  var query = window.location.search.substring(1);
  var vars = query.split("&")[0].split("=");
  //console.log("URL Location ",urlLoc);

  let emailId = vars[1];
  console.log("Email",emailId);

  const classes = useStyles();
  const [email, setEmail] = useState(emailId);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [countryCode, setcountryCode] = useState('');
  const [dob, setdob] = useState('');
  const [mobile, setMobile] = useState('');

  
  const handleRegisterCandidate = () => {

   let reqObj = {
      firstName,
      //"emailAddress": email,
      "emailAddress": emailId,
      lastName,
      countryCode,
      "dateOfBirth": dob,
      "mobileNo": mobile
    }

    console.log("request Object", reqObj);
    

    //AD - redirecting to, will move to success event 
    //window.location.href='http://3.16.109.39:3000/admin/question-management?emailId='+reqObj.emailAddress+'&assessmentId=1'
    //console.log(endPoint.serviceEndPoint);

    //http://3.15.175.168:8080/registerCandidate

    fetch(endPoint.serviceEndPoint+"/registerCandidate", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(reqObj)
    }).then((res) => res.json())
      .then((res) => {

        console.log("Sucessful invitation ", res)
        window.location.href='http://3.16.109.39:3000/admin/question-management?emailId='+reqObj.emailAddress+'&assessmentId=1'

      })


    // if(email==='anand@gmail.com' && password==='password'){
    //   setError(false);
    //   const url = `${endPoint.serviceEndPoint}valdiateLogin?loginId=`+email+`&password=`+password;
    //   fetch(url, {
    //     method:'GET',
    //     headers:{
    //       'Accept':'application/json',
    //       'Content-Type':'application/json',
    //       'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
    //     }
    //   }).then((res)=>res.json())
    //     .then(() =>{
    //       history.push('/admin/invite-candidate')
    //     })
    // }else{
    //   setError(true);
    //   setHelperText('Incorrect username or password');
    // }
  };

  return (
    <div style={{ margin: "0 20px" }}>
      <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Candidate Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}

                    inputProps={{ onChange: (e) => setfirstName(e.target.value) }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ onChange: (e) => setlastName(e.target.value) }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={emailId}
                    id="email-address"
                    formControlProps={{
                      fullWidth: false,
                      disabled:true,
                      
                    }}
                    //inputProps={{ onChange: (e) => setEmail(e.target.value) }}
                    inputProps={{ onChange: (e) => setEmail(emailId) }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mobile Number"
                    id="obile"
                    type="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ onChange: (e) => setMobile(e.target.value) }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country Code"
                    id="country-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ onChange: (e) => setcountryCode(e.target.value) }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date Of Birth : mm/dd/yyyy"
                    id="dob"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ onChange: (e) => setdob(e.target.value) }}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="primary"
                onClick={handleRegisterCandidate}
              >Register Candidate</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

class CandidateRegisterForAssessment extends Component {
 
 
  emailfromUrl = ''; //AD

  constructor(props) {
    super(props);
    this.showInstructions = this.showInstructions.bind(this);
    this.state = {
      showInstructions: true
    };
  }

  showInstructions() {
    this.setState({ showInstructions: false });
  }

  render() {
    const showInstructions = this.state.showInstructions;
    if (showInstructions) {
      console.log("in if")
      return (
        <ShowInstructions onClick={this.showInstructions} />
      );
    } else {
      console.log("in else");

      //AD: 
      //this.emailfromUrl = new URLSearchParams(this.props.location.search).get("emailId");
      //console.log(this.emailfromUrl);
           
      return (
        <RegisterForAssessment/>
      );
    }
  }

}

export default CandidateRegisterForAssessment;