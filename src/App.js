import React from 'react';
import './App.css';
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPostPage';
import Post from './store/PostContext';




function App() {
  const { user, setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  // console.log('qwer:',user);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  },[]);
  return (
    <Post>
      <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/view-post' element={<ViewPost/>} />
      
      </Routes>
    </Router>
    </Post>
  );
}

export default App;
