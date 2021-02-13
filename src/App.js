import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from  './ImageUpload';
import './ImageUpload.css';
import InstagramEmbed from 'react-instagram-embed';

function  getModalStyle(){
  const top = 50;
  const left= 50;

  return {
    top : `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles= makeStyles ((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const[posts,setPosts]=useState([]);
  const[openSignIn,setOpenSignIn]= useState(false);
  const[open, setOpen] = useState(false);
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  


useEffect (() => {
  const unsubscribe= auth.onAuthStateChanged((authUser) => { 
    if(authUser) {
      // user has logged in
      console.log(authUser);
      setUser(authUser);

      // if(authUser.displayName){
      //   // dont update username
      // } else {
      //   return authUser.updateProfile({
      //     displayName: username,
      //   });
      // }
      
    }

    else {
      // user has logged out
      setUser(null);
    }
  })
  return () => {
    // perform some cleanup actions
    unsubscribe();
  }


},  [user, username]);

useEffect(() => {

// this is where the code rin
  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {

  setPosts(snapshot.docs.map(doc => ({
   id: doc.id,
   post:doc.data() 
})));
   })

}, []);

const signUp = (event) => {
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) =>  {

     return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message))

  setOpen(false);
}

const SignIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);
}
  return (
    <div className="app">  



<Modal
      open={openSignIn}
      onClose= {() => setOpenSignIn(false)}
  >
  <div style={modalStyle} className={classes.paper}>
    <form className="app__signup">
    <center>
      <img
        className="app__headerImage"
        src="data:image/png;base64,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"
        alt=""
      />
      </center>

     <Input
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={SignIn}>Sign In</Button>

    </form>
{/* p */}
      </div>
    </Modal>

    <div className="app__header">
    <img 
     className="app__headerImage"
     src="https://pngimage.net/wp-content/uploads/2018/06/instagram-letras-png.png" width="100" height="50"
     alt=""
     />
    {user ? (
       <Button onClick={() =>auth.signOut()}>LogOut</Button>
      ): (
    <div className="app__loginContainer">
      <Button onClick={() =>setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() =>setOpen(true)}>Sign Up</Button>
    </div>
  )}
  

</div>
        <div className= "app__posts">
          <div className="app__postsLeft">
          {
            posts.map(({id,post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }

          </div>

          <div className="app__postsRight">
          
          <InstagramEmbed 
            url='https://www.instagram.com/p/CKZCHwYjoEK/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {
              console.log("loading")
            }}
            onSuccess={() => {
              console.log("success")
            }}
            onAfterRender={() => {
              console.log("rendering")
            }}
            onFailure={() => {
              console.log('fail')
            }}
          />

          {/* <img src={'https://www.instagram.com/p/CLI48ynB6bN/'}/> */}

          </div>
</div>


{user?.displayName ? (
      <ImageUpload username={user.displayName}/>
     ):(
       <h3>Sorry you need to login to upload</h3>
     )}


 
  <Modal
      open={open}
      onClose= {() => setOpen(false)}
  >
  <div style={modalStyle} className={classes.paper}>
    <form className="app__signup">
    <center>
      <img
        className="app__headerImage"
        src="data:image/png;base64,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"
        alt=""
      />

      
      </center>
      <Input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <Input
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signUp}>Sign Up</Button>

    </form>

      </div>
    </Modal>






    </div>
  );
}


 export default App;
