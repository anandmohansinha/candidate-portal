import React,{useState} from "react";
// @material-ui/core components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import endPoint from '../../variables/app.url'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function InviteCandidate() {
  const url = `${endPoint.serviceEndPoint}registerCandidateScheduleAssessment`;
  const assessmentsURL = `${endPoint.serviceEndPoint}assessments`;
  const classes = useStyles();
  const[email, setEmail] = React.useState('');
  const[name, setName] = React.useState('');
  const [value, setValue] = React.useState('java');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSendInvitation = ()=>{
    var data ={

        "candidate" : {
         "emailAddress" : email,
         "firstName" : name
       },
       "candidateAssessment" : {
           "assessment" : {
               "id" : value
           }
       }
   }

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

         alert("Mail send successfully")
         setEmail('');
         setName('');
         setValue('');
        })

    // if(email==='anand@gmail.com' && password==='password'){
    //       setError(false);
    //       debugger  }
    // else{
    //   setError(true);
    //   setHelperText('Incorrect username or password');
    // }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
           value={name}
            name="name"
            onChange={(e)=>setName(e.target.value)}
            autoComplete="off"
          />
   <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="01" control={<Radio />} label="Java" />
        <FormControlLabel value="02" control={<Radio />} label="Angular" />
        <FormControlLabel value="03" control={<Radio />} label="React" />
        <FormControlLabel value="04" control={<Radio />} label="Spring Boot" />
        <FormControlLabel value="1302" control={<Radio />} label="IBM-BPM" />
      </RadioGroup>
    </FormControl>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handleSendInvitation()}
          >
            Send Invite
              </Button>
        </form>
      </div>
    </Container>
  );
}