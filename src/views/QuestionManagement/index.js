import React, { Component, useEffect, useRef } from 'react'
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

import endPoint from '../../variables/app.url'
import styles from './QuestionManagement.module.css'

export default function QuestionManagement(props) {
    const [questions, setQuestions] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const [technology, setTechnology] = React.useState('');
    const [nextDisable, setNextDisable] = React.useState(false);
    const [preDisable, setPrevDisable] = React.useState(true);
    const [value, setValue] = React.useState('');
    const [answers, setAnswer] = React.useState({});
    const [email, setEmail] = React.useState();
    const [isDataLoaded, setisDataLoaded] = React.useState(false);
    const [isTestSubmitted, setIsTestSubmitted] = React.useState(false);
    let submitButton = useRef(null);
    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false);

    const [queId, setQuesId] = React.useState(0);



    const next = (event) => {
        

        if (questions.length > 0 && questions.length == count + 1) {
            setNextDisable(true);
        }
        setCount(count + 1);

        setQuesId(questions[count].id);
        console.log(queId);

        setPrevDisable(false);
        setSelectedIndex(selectedIndex + 1);
        if (answers && answers.questionAnswerReq[selectedIndex + 1] && answers.questionAnswerReq[selectedIndex + 1].optionId) {
            setValue(answers.questionAnswerReq[selectedIndex + 1].optionId);
        }
    };
    const prev = (event) => {

        if (questions.length > 0 && count == 2) {
            setPrevDisable(true);
        }
        setCount(count - 1)

        setQuesId(questions[count].id);

        setNextDisable(false);
        setSelectedIndex(selectedIndex - 1);

        if (answers && answers.questionAnswerReq[selectedIndex - 1] && answers.questionAnswerReq[selectedIndex - 1].optionId) {
            setValue(answers.questionAnswerReq[selectedIndex - 1].optionId);
        }

        
        /* if(answers.questionAnswerReq[selectedIndex - 1] !== undefined){
           console.log("Undefined");
            if (questions.length > 0 && count == 2) {
                setPrevDisable(true);
            }
            setCount(count - 1)

            setQuesId(questions[count].id);

            setNextDisable(false);
            setSelectedIndex(selectedIndex - 1);

            if (answers && answers.questionAnswerReq[selectedIndex - 1] && answers.questionAnswerReq[selectedIndex - 1].optionId) {
                setValue(answers.questionAnswerReq[selectedIndex - 1].optionId);
            }
        }else{
            if (questions.length > 0 && count == 2) {
                setPrevDisable(true);
            }
            setCount(count - 1)

            setQuesId(questions[count].id);

            setNextDisable(false);
            setSelectedIndex(selectedIndex - 1);
            if (answers && answers.questionAnswerReq[selectedIndex - 1] && answers.questionAnswerReq[selectedIndex - 1].optionId) {
                setValue(answers.questionAnswerReq[selectedIndex - 1].optionId);
            }
        } */
        
    };
    const submit = ()=>{
        setIsSubmitClicked(true);

        fetch(`${endPoint.serviceEndPoint}submitAssessment?emailId=`+email, {
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

        //console.log(selectedIndex,event.target.value);

        let { questionAnswerReq } = answers;
        let quesAns = {
            "questionId": queId,
            "optionId": event.target.value,
            "selected":selectedIndex
        }
        //console.log("Handle Change",quesAns);

        questionAnswerReq.push(quesAns);
        for (const key in questionAnswerReq) {
            if (questionAnswerReq.hasOwnProperty(key)) {
                const element = questionAnswerReq[key];
                if (questionAnswerReq[key].questionId === quesAns.questionId && questionAnswerReq[key].optionId !== quesAns.optionId) {
                    questionAnswerReq[key].optionId = quesAns.optionId;
                    questionAnswerReq.pop();
                }
            }
        }

        //console.log(questionAnswerReq);
    };

    useEffect(() => callApi(), []);


const callApi=()=>{
    fetch(`${endPoint.serviceEndPoint}assessment/`+props.history.location.search, {
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }).then((res)=>res.json())
            .then((res) => {
                if (res.dataAvailable) {
                    setQuestions(res.assessments.questions);
                    setTechnology(res.assessments.technology);
                    setEmail(res.candidate.emailAddress);
                    setAnswer({ "assessmentId": res.assessments.id, "questionAnswerReq": [] });

                    setQuesId(res.assessments.questions[0].id);
                    setAssessmentTimer(res.assessments.duration);
                }
                setisDataLoaded(true);
            })
    }

    const setAssessmentTimer = (timeInMinutes) => {
        const time = timeInMinutes * 60 * 1000;

        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;

           var getReady = setInterval(quizTimer, 1000);

            function quizTimer () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration;
                    console.log("Time Up");
                    submitButton.current.click();
                    clearInterval(getReady);
                }
            };
        }

        var quizDuration = 60 * timeInMinutes,
        display = document.querySelector('#time');
        startTimer(quizDuration, display);

        //const time = 10000;
        /* setTimeout(() => {
            console.log(submitButton);
            submitButton.current.click();
        }, time); */
    }

    const radioButtonContent = () => {
        return (
            questions[selectedIndex].options.map((option, index) => (
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
            {isTestSubmitted && <label>Your test has been submitted successfully.We wish you good luck.If you are shortlisted our recruiter team will get in touch with you.Thanks.</label>}
            {!isTestSubmitted && questions.length > 0 && <GridContainer>
            {/* {questions.length > 0 && <GridContainer> */}
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <Typography variant="h6">
                                Technology - {technology}
                                <span className={styles.toright}>Assessment will end in <span id="time" className={styles.quiztimer}>00:00</span> minutes!</span>
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
                                            questions[selectedIndex].options.map((option, index) => (
                                                <FormControlLabel key={index} checked={option.id == value} value={option.id} control={<Radio />} label={option.description} />

                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>

                            </div>
                        </CardBody>
                    </Card>
                    <div className={styles.align_buttons}>
                        <Button className={styles.button_margin}
                            type="button"
                            variant="contained"
                            color="secondary"
                            size="large"
                            disabled={preDisable}
                            onClick={() => prev()}
                        >
                            Prev
                  </Button>
                        <Button className={styles.button_margin}
                            type="button"
                            variant="contained"
                            color="secondary"
                            size="large"
                            disabled={nextDisable}
                            onClick={() => next()}
                        >
                            Next
                  </Button>
                        <Button className={styles.button_margin}
                            type="button"
                            variant="contained"
                            color="secondary"
                            size="large"
                            id = "btn-submit"
                            disabled={isSubmitClicked}
                            ref={submitButton}
                            onClick={() => submit()}
                        >
                            submit
                  </Button>
                    </div>
                </GridItem>
            </GridContainer>}
        </div>)
};