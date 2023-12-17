import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';


import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const[userName,setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {auth,db} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, email, phone, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // userCredential.user.displayName = userName;
      // console.log(userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: userName
      });
  

      // await userCredential.user.updateProfile({
      //   displayName: userName,
      // });

      await addDoc(collection(db, 'users'), {
        id: userCredential.user.uid,
        userName: userName,
        phone: phone,
      });

      navigate('/login');
    } catch (error) {
      console.log(error);
      alert(error.message);
      // Handle errors that occur during the authentication or data creation process
    }
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
<br></br>
<Link to='/login' className="button-link">Login</Link>
      </div>
    </div>
  );
}
