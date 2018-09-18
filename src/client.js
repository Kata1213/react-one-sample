import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Homepage from './components/homepage';
import AboutUs from './components/about-us';
import Navigation from './components/navigation';
import Login from './components/login-form';
import ClassList from './components/class-list';
import { authenticationReducer } from './reducers';

const store = createStore(combineReducers({
  authentication: authenticationReducer
}));

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={AboutUs} />
          <Route path="/login" component={Login} />
          <Route path="/classes" component={ClassList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)