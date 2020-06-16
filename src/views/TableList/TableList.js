import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
export default function TableList() {
 
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://18.191.46.80:8080/candidateDetails";
  const [AttemptedtableData, setAttemptedtableData] = useState([]);
  const [unAttemptedtableData, setUnAttemptedtableData] = useState([]);
  
  useEffect(() => {
    doRequest()
  }, []);
  
  const doRequest = ()=>{
     fetch(url, {
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }).then((res)=>res.json())
      .then((res) =>{
        prepareData(res);
        setIsLoading(false);
      })
  }
    
  const prepareData = (res)=>{
    let candidates = res.candidates;
    candidates.forEach(function (candidates, index) {
      const {firstName, emailAddress, inviteDate, attemptedDate, status, name, percentage} = candidates;
        if(status === true){
          AttemptedtableData.push([firstName, emailAddress,name,percentage, inviteDate, attemptedDate]);
        } else {
          unAttemptedtableData.push([firstName, emailAddress, name, inviteDate]);
        }
       
    });
  }
 
  if(AttemptedtableData.length === 0 && unAttemptedtableData ===0){
    return null;
  }
  
  return (
 <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Attempted</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
          
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Domain" ,"Percentage" ,"Invite Date", "Attempted Date"]}
              tableData={AttemptedtableData}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Not Attempted
            </h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Domain", "Invite Date"]}
              tableData={unAttemptedtableData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
   
 );
}

  

