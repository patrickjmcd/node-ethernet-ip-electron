import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createIpc, { send } from 'redux-electron-ipc';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

import TagsIndex from './components/TagsIndex';
import Settings from './components/Settings';
import Header from './components/Header';

import { ipcTagUpdate, ipcPlcDetailsReceived } from './actions';

const ipc = createIpc({
  'tag:valueupdate': ipcTagUpdate,
  'plc:connected': ipcPlcDetailsReceived
})

const createStoreWithMiddleware = applyMiddleware(ipc)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/" component={TagsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#container'));
