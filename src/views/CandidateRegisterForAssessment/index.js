import React ,{useState}from "react";
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
import endPoint from '../../variables/app.url'

import avatar from "assets/img/faces/marc.jpg";

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





export default function CandidateRegisterForAssessment() {
  const classes = useStyles();
  const [email, setEmail] = useState('pravinmhaske997@gmail.com');
const [firstName, setfirstName] = useState('pravin');
const [lastName, setlastName] = useState('mhaske');
const [countryCode, setcountryCode] = useState('+91');
const [dob, setdob] = useState('06-sept-1990');
const [mobile, setMobile] = useState('9623044643');

const handleRegisterCandidate = ()=>{


  let reqObj={
    firstName,
    "emailAddress":email,
    lastName,
    countryCode,
    "dateOfBirth": dob,
    "mobileNo": mobile
    }

    console.log("Hello sir",reqObj);
    fetch(endPoint.serviceEndPoint, {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(reqObj)
    }).then((res)=>res.json())
      .then((res) =>{
      
     console.log("Sucessful invitation ",res)
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
    <div style={{margin: "0 20px"}}>
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

                    inputProps={{onChange:(e)=>setfirstName(e.target.value)}}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{onChange:(e)=>setlastName(e.target.value)}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{onChange:(e)=>setEmail(e.target.value)}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mobile Number"
                    id="obile"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e)=>setMobile(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country Code"
                    id="country-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date Of Birth"
                    id="dob"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{onChange:(e)=>setdob(e.target.value)}}
                  />
                </GridItem>
              </GridContainer>
            
            </CardBody>
            <CardFooter>
              <Button  color="primary"
               onClick={handleRegisterCandidate}
              >Register Candidate</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
