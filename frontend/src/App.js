import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

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
      <Switch>
          <PrivateRoute exact path="/wallet" component={Wallet} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
