import React, { Component, useEffect } from 'react'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function QuestionManagement () {
    const [questions, setQuestions] = React.useState([]);
    const[selectedIndex, setSelectedIndex]=React.useState(0);
    const[count, setCount]=React.useState(1);
    const[technology, setTechnology]=React.useState('');
    const[ nextDisable, setNextDisable] = React.useState(false);
    const[ preDisable, setPrevDisable] = React.useState(true);

    const next = (event) => {
        if(questions.length>0 && questions.length==count+1){
            setNextDisable(true);
        }
            setCount(count+1);
            setPrevDisable(false);
            setSelectedIndex(selectedIndex+1);
        
    };
    const prev = (event) => {
        if(questions.length>0 && count==2){
            setPrevDisable(true);
        }
        setCount(count-1)
        setNextDisable(false);
        setSelectedIndex(selectedIndex-1); 
    };
    const handleChange = (event)=>{
        
    }

useEffect(()=>callApi(), []);

const callApi=()=>{
    fetch('http://18.223.111.230:8080/assessment/3?emailId=KUMAR.ABHISHEK1@synechron.com', {
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }).then((res)=>res.json())
        .then((res) =>{
            debugger
            setQuestions(res.assessments.questions);
            setTechnology(res.assessments.technology)
        })

}

if(questions.length == 0 || questions[selectedIndex]=='undefined'){
    return "";
}
    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <Typography variant="h6">
                            Technology - {technology}
                        </Typography>
                        {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}

                    </CardHeader>
                    <CardBody>
                        <div>
                            <Typography variant="h6" mt={8}>
                              {count}. {questions[selectedIndex].header}
                            </Typography>
                            <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value="" onChange={handleChange}>
                            {
                                questions[selectedIndex].options.map((option,index) =>(
                                    <FormControlLabel value={option.description} control={<Radio />} label={option.description} />
                                   
                                ))
                           } 
                            </RadioGroup>

                          
                                
                            </FormControl>
                        </div>
                    </CardBody>
                </Card>
                <div>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={preDisable}
                        onClick={()=>prev()}
                    >
                        Prev
                  </Button>
                  <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={nextDisable}
                        onClick={()=>next()}
                    >
                        Next
                  </Button>
                </div>
            </GridItem>
        </GridContainer>
    )
};