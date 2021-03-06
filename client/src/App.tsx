import React from 'react';
import Layout from './views/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './redux'
import { Provider } from 'react-redux'
import Login from './views/login/Login';
import Register from './views/register/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/layout" component={Layout}>
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
