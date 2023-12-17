import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context,{ FirebaseContext } from './store/Context';
import { auth,db, storage  } from './firebase/config';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FirebaseContext.Provider value={{ auth,db, storage  }}>
       <Context>
        <App />
    </Context>
  </FirebaseContext.Provider>
);


