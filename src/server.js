import csshook from 'css-modules-require-hook/preset';
import express from 'express';
import path from 'path';
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

app.use((request, response, next) => {
  if (request.url.startsWith('/static/')) {
    return next()
  }
  const context = {};
  const appString = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={request.url}
        context={context}>
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

app.use('/', express.static(path.resolve('build')))

app.listen("9000", () => console.log('SSR Server started'));