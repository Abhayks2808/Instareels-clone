import React,{useState,useContext,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BackupIcon from '@material-ui/icons/Backup'
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { firebasedb, firebasestoratege } from '../config/firebase';
import { AuthContext } from '../context/Authcontext';

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
  
const Signup = ({history}) => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [profile,setprofile]=useState(null);
    const [error,seterror]=useState("");
    const {signup}=useContext(AuthContext);
     const handleSignup=async (e) =>{
      e.preventDefault();
      try{
           let response=await signup(email,password);
           // user has signup a unique uid has been creatd by firebase
           let uid=response.user.uid;
           // created a separate space of storing profile photos in firebase storage
           let uploadPhotoObj=firebasestoratege.ref(`/profilephotos/${uid}/image`).put(profile);
           // fun1 -> giving the progress of uploading status
           const fun1=(snapshot) => {
            //byte transfered 
              // total bytes
              let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
              console.log(progress);
           }
           // fun2 -> it indicates about error 
           const fun2=(error) => {
            console.log(error);
           }
           // it indicates success of upload
           const fun3=async () => {
               // get link of profile picture to store
               let profileImageurl=await uploadPhotoObj.snapshot.ref.getDownloadURL();
               firebasedb.collection("users").doc(uid).set({
                   email,
                   userid:uid,
                   profileImageurl,
                   posts:[]
               })
           }
           // event change triggered
           uploadPhotoObj.on("state_changed",fun1,fun2,fun3);
           history.push("/");
        
      }
      catch(err){
        seterror(err.message);
        setemail("");
        setpassword("");
        console.log(err)  
      }
     }
     
     const handleProfile = (e) =>{
       const fileObj=e.target.files[0];
       setprofile(fileObj);
     }
     const classes = useStyles();

    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        {error ? <Expire delay="3000" err={error} errset={seterror}/>:<></> }
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignup}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
  
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button variant="outlined"
            color="secondary"
             fullWidth={true}
             size="medium"
            onChange={(e) => { handleProfile(e) }}
            startIcon={<BackupIcon />}>UPLOAD PROFILE IMAGE
            <TextField type="file"
             required
             style={{ opacity: "0", position: "absolute", width: "100%", height: "100%" }}>
            </TextField>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {" have an account? Login Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
   
     );
}
const Expire = props => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
        props.errset("");
      }, props.delay);
    });
    
     return visible ? <Alert  severity="error">{props.err}</Alert> : <></>;
};
export default Signup;