import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './App';

// Create browser history to use in the Redux store
const store = configureStore();
const rootElement = document.getElementById('root');

//import * as serviceWorker from './serviceWorker';
const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
  

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp)
}

renderApp()

//serviceWorker.unregister();
