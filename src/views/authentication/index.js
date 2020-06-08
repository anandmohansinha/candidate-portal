import React,{Component, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  function validateUserDetails(){
    alert(1)
  }
  export default function Login() {
   
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('null');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    let history = useHistory();
    useEffect(()=>{
      if(email.trim() && password.trim()){
        setIsButtonDisabled(false);
      }else{
        setIsButtonDisabled(true);
      }
    }, [email,password ]);

    const handleLogin = ()=>{
      if(email==='anand@gmail.com' && password==='password'){
        setError(false);
        const url = `http://18.223.111.230:8080/valdiateLogin?loginId=`+email+`&password=`+password;
        fetch(url, {
          method:'GET',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        }).then((res)=>res.json())
          .then(() =>{
            history.push('/admin/invite-candidate')
          })
      }else{
        setError(true);
        setHelperText('Incorrect username or password');
      }
    };  

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={helperText}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isButtonDisabled}
              onClick={()=>handleLogin()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.synechron.com">
          Synechron
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
        </Box>
      </Container>
    );
  }
  