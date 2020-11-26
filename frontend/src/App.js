import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';

function PrivateRoute(props){
  const history = useHistory()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      history.push("/login")
    }
  },[])
  return(
    <Route {...props}></Route>
  )
}

function App() {
  return (
    <Router>
      <Header/>
    </Router>
  );
}

export default App;
