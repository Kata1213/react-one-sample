import 'css-modules-require-hook/preset';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import buildPath from '../build/asset-manifest.json';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Homepage from './components/homepage';
import AboutUs from './components/about-us';
import Navigation from './components/navigation';
import Login from './components/login-form';
import ClassList from './components/class-list';
import { authenticationReducer } from './reducers';

const store = createStore(combineReducers({
  isAuthenticated: authenticationReducer
}));

const app = express();

app.use(bodyParser.json());

app.use((request, response, next) => {
  if (request.url.startsWith('/static/')) {
    return next()
  }

  if (request.url.startsWith('/sessions')) {
     return next();
  }

  const appString = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={request.url}
        context={{}}>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={AboutUs} />
            <Route path="/login" component={Login} />
            <Route path="/classes" component={ClassList} />
          </Switch>
        </div>
      </StaticRouter>
    </Provider>)
  );
  const html = `<html>
        <head>
            <meta charset="utf-8">
            <title>SSR</title>
        </head>
        <body>
            <div id="root">${appString}</div>
            <script src="/${buildPath['main.js']}"></script>
        </body>
    </html>`;
  response.send(html);
});

app.post('/sessions', (request, response) => {
  const { username, password } = request.body;
  if (username === 'tw' && password === 'tw') {
      response.send({ token: 'DKLJLSKADJF', expiredOn: '2018-09-20 17:00:00'});
  } else {
      response.send({
          reason: 'Username or password is incorrect'
      });
  }
});

app.use('/', express.static(path.resolve('build')));

app.listen("9000", () => console.log('SSR Server started'));