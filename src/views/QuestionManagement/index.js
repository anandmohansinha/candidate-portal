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

export default function QuestionManagement (props) {
    const [questions, setQuestions] = React.useState([]);
    const[selectedIndex, setSelectedIndex]=React.useState(0);
    const[count, setCount]=React.useState(1);
    const[technology, setTechnology]=React.useState('');
    const[ nextDisable, setNextDisable] = React.useState(false);
    const[ preDisable, setPrevDisable] = React.useState(true);
    const [value, setValue] = React.useState('');
    const[answers, setAnswer] = React.useState({});
    const[email, setEmail]= React.useState();
    const [isDataLoaded, setisDataLoaded] = React.useState(false);
    const [isTestSubmitted, setIsTestSubmitted] = React.useState(false);
    let styleButtons     = {
        marginRight: '5px',
      };

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
    const submit = ()=>{
        fetch('http://52.14.195.214:8080/submitAssessment?emailId='+email, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify(answers)
      }).then((res)=>res.json())
        .then((res) =>{
            console.log("submitAssessment",res);
            if(res.dataSubmited){
                setIsTestSubmitted(true);
            }
            
        })
    }
    const handleChange = (event) => {
        setValue(event.target.value);
        let {questionAnswerReq} = answers;
        let quesAns = {
            "questionId": count,
            "optionId": event.target.value
        }
       questionAnswerReq.push(quesAns);
       
      };

    

useEffect(()=>callApi(), []);

const callApi=()=>{
    fetch('http://52.14.195.214:8080/assessment/'+props.history.location.search, {
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }).then((res)=>res.json())
        .then((res) =>{
            if(res.dataAvailable) {
                setQuestions(res.assessments.questions);
                setTechnology(res.assessments.technology);
                setEmail(res.candidate.emailAddress);
                setAnswer({"assessmentId": res.assessments.id, "questionAnswerReq": []});
            }
            setisDataLoaded(true)
        })
}

const radioButtonContent = ()=>{
    return(
        questions[selectedIndex].options.map((option,index) =>(
            <FormControlLabel value={option.id} control={<Radio />} label={option.description} />
        
        ))
    )
}

// if(questions.length == 0 || questions[selectedIndex]=='undefined'){
//     return "";
// }
    return (
        <div>
        {!isTestSubmitted && isDataLoaded && !questions.length && <label>There is not any active assignment assigned to you.Please contact recruiter.</label>}
        { isTestSubmitted &&  <label>Your test has been submitted sucsessfully.We wish you good luck.If you are shortlisted our recruiter team will get in touch with you.Thanks.</label>}
        {!isTestSubmitted &&  questions.length &&   <GridContainer>
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
                             <FormLabel component="legend"></FormLabel>
                                <RadioGroup aria-label="question" name="question" value={value} onChange={handleChange}>
                                {
                                    questions[selectedIndex].options.map((option,index) =>(
                                        <FormControlLabel value={option.id} control={<Radio />} label={option.description} />
                                    
                                    ))
                                }
                                </RadioGroup>  
                            </FormControl>
                           
                        </div>
                    </CardBody>
                </Card>
                <div>
                    <Button
                       style={styleButtons}
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
                      style={styleButtons}
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={nextDisable}
                        onClick={()=>next()}
                    >
                        Next
                  </Button>
                  <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={()=>submit()}
                    >
                        submit
                  </Button>
                </div>
                            </GridItem> 
                            </GridContainer>}
   </div> )
};




