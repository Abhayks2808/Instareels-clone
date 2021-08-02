import React,{useState,useContext} from 'react';
import { firebasedb, firebasestoratege } from '../config/firebase';
import { AuthContext } from '../context/Authcontext';

const Signup = ({history}) => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [profile,setprofile]=useState(null);
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
           history.pushState("/");
        
      }
      catch(err){
       console.log(err);
      }
     }
     
     const handleProfile = (e) =>{
       const fileObj=e.target.files[0];
       setprofile(fileObj);
     }
    return ( 
        <div>
            <form onSubmit={handleSignup}>
                <div>
                email:
                <input  type="email" label="email" value={email} onChange={(e) => setemail(e.target.value) } /> 
                </div>
                <div>
                password:
                <input type="password" label="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
               </div>
               <div>
                   <input type="file" accept="image/jpg" onChange={(e) => handleProfile(e)}/>
               </div>
                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default Signup;