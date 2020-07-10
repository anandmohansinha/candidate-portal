import React ,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import endPoint from '../../variables/app.url'

const useStyles = makeStyles(styles);


export default function Dashboard() {
  const[subjectCount, setSubjectCount]= React.useState([]);

  // Icon and Color to display on Grid
  let iconValue = ["warning", "success", "danger", "info", "rose"];

  // Append icon to subjectCount array
  for(let i=0; i < subjectCount.length; i++) {
    subjectCount[i].iconColor = random_item(iconValue);
  }

  function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
  };

  const classes = useStyles();
  useEffect(()=>callApi(), []);

  const callApi=()=>{
    fetch(`${endPoint.serviceEndPoint}candidatesAssessments`, {
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    }).then((res)=>res.json())
        .then((res) =>{
          setSubjectCount(res);
        })
  }

  if(subjectCount.length === 0 ){
    return null
  }

  return (
      <div>
        <GridContainer>
          {
            subjectCount.map(item => (
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color={item.iconColor} stats icon>
                      <CardIcon color={item.iconColor}>
                        {(() => {
                          switch (item.iconColor) {
                            case 'warning':
                              return  <Icon>content_copy</Icon>;
                            case 'success':
                              return <Store />;
                            case 'danger':
                              return  <Icon>info_outline</Icon>;
                            case 'info':
                              return <Accessibility />;
                            case 'rose':
                              return <LocalOffer />
                            default:
                              return null;
                          }
                        })()}
                      </CardIcon>
                      <p className={classes.cardCategory}>{item.assessmentName}</p>
                      <h3 className={classes.cardTitle}>{item.candidateCount} <small></small>
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Update /> {item.assessmentName}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
            ))}
        </GridContainer>
      </div>
  );
}