import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { Container } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { firebasedb } from '../config/firebase';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import Header from './header';
import { Grid } from '@material-ui/core';
import './profile.css'

const Profile = () => {
    const {currentUser}=useContext(AuthContext);
    const [email,setemail]=useState("");
    const [profile,setprofile]=useState("");
    const [postlength,setpostslength]=useState(0);

      
    const useStyles=makeStyles({
        userImageIcon: {
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
            height: "8rem",
            width: "8rem",
            objectFit:"cover"
        },
        imageSection: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        userDescription: {
            lineHeight: "2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        
        useremail: {
            fontFamily: "Quicksand, sans-serif",
            fontSize: "xx-large",
            color: "#485460",
        },
        videoContainer: {
            position: "relative",
        },
    })

    useEffect(()=>{
        // get user data from firebase
        async function getuser(){
            // current logged in user uid
            let userid=currentUser.uid;
             // get all the data of current user from firestore
             let doc=await firebasedb.collection("users").doc(userid).get();
             let userdetails=doc.data();
             console.log(userdetails);
             setemail(userdetails.email);
             setprofile(userdetails.profileImageurl);
             setpostslength(userdetails.posts.length);
          }
          getuser();
        
    })

    
    const classes = useStyles();
    return (
        <> 
        <Header user={currentUser}></Header>
        <Container style={{ backgroundColor: "", width: "60vw", marginTop: "5rem" }}>
            <Grid container style={{ minHeight: "30vh", marginBottom: "3rem" }}>
            <Grid item xs={12} sm={12} md={5} lg={5}
                className={classes.imageSection}>
               <Avatar alt="Remy Sharp" src={profile} className={classes.userImageIcon} />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} className={classes.userDescription}>
            <div>
                <div className={classes.useremail}><span>Email:</span>{email}</div>
                    <div style={{ color: "#485460" }}>
                        <span style={{ fontWeight: "500", color: "#3d3d3d", fontSize: "large" }}></span>No. of posts:
                         {postlength}
                        </div>
                    <div style={{ color: "#485460" }}></div>
                        </div>
            </Grid>
        </Grid>
        <Divider/>
           <div className={classes.videoContainer}>

           </div>
        </Container>
        </>
     );
}
   
export default Profile;