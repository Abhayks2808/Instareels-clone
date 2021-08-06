import React,{useState} from 'react';
import { useContext } from 'react';
import { firebasedb, firebasestoratege } from '../config/firebase';
import { AuthContext } from '../context/Authcontext';
import {v4 as uuidv4} from 'uuid';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Header from './header';
import { makeStyles } from '@material-ui/styles';

const Feeds = () => {
    const [video,setvideo]=useState(null);
    const {currentUser}=useContext(AuthContext);
    const handlevideoInput=(e) =>{
        let fileObj=e.target.files[0];
        setvideo(fileObj);
    }
    const useStyles = makeStyles((theme) => ({
        // root: {
        //     '& > *': {
        //         margin: theme.spacing(1),
        //         paddingLeft: "7%"
        //     },
        // },
        input: {
            display: 'none',
        },
        feedContainer: {
            width: "100vw",
            // backgroundColor: "lightblue",
            marginTop: "5rem"
        },
        // reelsContainer: {
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //     marginTop: "3rem",
        //     gap: "7rem"
        // },
        // likeIcon: {
        //     fontSize: "x-large"
        // },
        // commentIcon: {
        //     fontSize: "x-large"
        // },
        // liked: {
        //     color: "#ff5252"
        // },
        // unliked: {
        //     color: "#f1f2f6"
        // },
        // videoContainer: {
        //     position: "relative",
        //     display: "flex"
        // },
        // circularLoader: {
        //     position: "absolute",
        //     top: "calc( 100% / 2 )"
        // },
        // videoActionsIconsContainer: {
        //     display: "flex",
        //     width: "7rem",
        //     justifyContent: "space-around"
        // },
        // modal: {
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // },
        // paper: {
        //     backgroundColor: theme.palette.background.paper,
        //     boxShadow: theme.shadows[5],
        //     padding: theme.spacing(2, 4, 3),
        //     width: "30vw",
        //     height: "35vh",
        //     borderRadius: "10px",
        //     textAlign: "center",
        //     outline: "none",
        // },
        // videoDescriptionSection: {
        //     position: "absolute",
        //     bottom: "1rem",
        //     left: "0.5rem",
        //     minHeight: "5rem",
        //     // backgroundColor: "lightgreen",
        //     display: "flex",
        //     flexDirection: "column",
        //     justifyContent: "space-around",
        //     // gap: "1rem",
        // }
    }))
    let classes = useStyles();

    const handlevideoupload=() =>{
        // loggedin user id
        const uid=currentUser.uid;
        //upload video in storage
        let uploadvideoObj=firebasestoratege.ref(`/videos/${uid}/${Date.now().toString()}mp4`).put(video);
        // to track progress of upload
        const fun1=(snapshot) =>{
            //byte transfered 
            // total bytes
            let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(progress);
         }
         // it indicates error
         const fun2=(error) =>{
          console.log(error);
         }
         // it indicates success of upload
         const fun3=async () =>{
             const VideoLink=await uploadvideoObj.snapshot.ref.getDownloadURL();
             let postid=uuidv4();
             firebasedb.collection("posts").doc(postid).set({
                 postid,
                 uid,
                 VideoLink,
                 comment:[],
                 likes:[]
             })

             let doc=await firebasedb.collection("users").doc(uid).get();
             let document=doc.data();
             document.posts.push(postid);
             firebasedb.collection("users").doc(uid).set(document);
         }

         uploadvideoObj.on("state_changed",fun1,fun2,fun3);
    }
    return (  
        <>
         <Header user={currentUser}></Header>
        <Container className={classes.feedContainer}>

            <div>
            <input accept="video/mp4,video/x-m4v,video/*"  type="file"
             onChange={handlevideoInput} 
             
             />
              <label style={{ paddingLeft: "0" }} htmlFor="icon-button-file">
                <Button variant="outlined" color="secondary" component="span" onClick={handlevideoupload}  endIcon={<PhotoCamera />}>
                 Upload
                </Button>
            </label>
            </div>
        </Container>
        </>
    );
}
 
export default Feeds;