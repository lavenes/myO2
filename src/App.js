import React, { Component, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {messaging, showNotification} from './Global/Variables';

//COMPONENTS
import {HeaderBar} from './components/HeaderBar';

//VIEWS
import Signup from './views/Signup';
import Login from './views/Login';
import Management from './views/Management';
import AddNew from './views/AddNew';
import Home from './views/Home';
import Information from './views/Information';
import Welcome from './views/Welcome';
import Request from './views/Request';
import Info from './views/Info';

function HalfPrivateRoute ({component: Component, ...rest}) {
  let authed = localStorage.getItem('district') && localStorage.getItem('city') && localStorage.getItem('phone') ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/welcome', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, ...rest}) {
  let authed = localStorage.getItem('district') && localStorage.getItem('city') && localStorage.getItem('phone') && localStorage.getItem('uid') ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const App = (props) => {
  useEffect(() => {
    //Get firebase cloud msg token
    messaging.getToken().then(async function() {
      const token = await messaging.getToken();
      localStorage.setItem('pushToken', token);
    }).catch(function(err) {
      //alert("Unable to get permission to notify.", err);
    });

    //Listen on received msg from Cloud
    messaging.onMessage(res => {
      console.log(res);
      showNotification(res.data.title, res.data.body); //Show notifications
    })
  }, [])

  return (
    <div>
      <HeaderBar/>
      <Main/>
    </div>
  )
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <main>
          <Switch>
            <HalfPrivateRoute exact path='/' component={Home}/>
            <Route exact path='/welcome' component={Welcome}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path='/management' component={Management}/>
            <PrivateRoute exact path='/request' component={Request}/>
            <PrivateRoute exact path='/add/:district' component={AddNew}/>
            <PrivateRoute exact path='/edit/:district/:id' component={(props) => <AddNew isEdit={true} {...props}/>}/>
            <HalfPrivateRoute exact path='/oxy/:district/:id' component={Information}/>
            <Route exact path='/information' component={Info}/>
          </Switch>
        </main>
      )
  }
}

export default App;