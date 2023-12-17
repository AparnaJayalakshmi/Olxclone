import React from 'react';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useContext(FirebaseContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <br></br>
        <Link to='/signup' className="button-link">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
