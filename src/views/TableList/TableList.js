import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import endPoint from "../../variables/app.url";

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
  const url = `${endPoint.serviceEndPoint}candidateDetails`;

  const [AttemptedtableData, setAttemptedtableData] = useState([]);
  const [unAttemptedtableData, setUnAttemptedtableData] = useState([]);

  useEffect(() => {
    doRequest()
  }, []);

  const doRequest = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }).then((res) => res.json())
      .then((res) => {
        prepareData(res);
        setIsLoading(false);
      })
  }

  const prepareData = (res) => {
    let candidates = res.candidates;
    candidates.forEach(function (candidate, index) {
      const { emailAddress, mobileNo, inviteDate, attemptedDate, status, assessmentName, percentage, result } = candidate;
      const fullName = `${candidate.firstName} ${candidate.lastName}`;
      if (status === true) {
        AttemptedtableData.push([fullName, emailAddress, mobileNo, assessmentName, percentage, inviteDate, attemptedDate, result]);
      } else {
        unAttemptedtableData.push([fullName, emailAddress, mobileNo, assessmentName, inviteDate]);
      }

    });
  }

  if (AttemptedtableData.length === 0 && unAttemptedtableData === 0) {
    return null;
  }

  const downloadExcel = () => {
    const url = `${endPoint.serviceEndPoint}download/candidateDetails`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }).then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "candidates.xlsx";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();  //afterwards we remove the element again         
      });
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={downloadExcel}>
          Download
          <GetAppIcon />
        </Button>
      </GridItem>
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
              tableHead={["Name", "Email", "Mobile", "Domain", "Percentage", "Invite Date", "Attempted Date"]}
              tableData={AttemptedtableData}
              attemptedTable={true}
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
              tableHead={["Name", "Email", "Mobile", "Domain", "Invite Date"]}
              tableData={unAttemptedtableData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>

  );
}



