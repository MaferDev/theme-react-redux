/*import {combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './monitorReducer'
import loggerMiddleware from './logger'

import * as Paciente from './Paciente';
import * as OrdenServicio from './OrdenServicio';
import * as Usuario from './Usuario';

export default function configureAppStore(preloadedState) {
  const reducers = {
    paciente: Paciente.reducer,
    ordenServicio: OrdenServicio.reducer,
    usuario: Usuario.reducer
  }
  
  const rootReducer = combineReducers({...reducers});

  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer))
  }
  
  return store
}*/

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducerEnhancer from './monitorReducer'
import loggerMiddleware from './logger'

import * as Paciente from './Paciente';
import * as Atencion from './Atencion';
import * as Usuario from './Usuario';

export default function configureStore(preloadedState) {
  const reducers = {
    paciente: Paciente.reducer,
    Atencion: Atencion.reducer,
    usuario: Usuario.reducer
  };
  
  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer))
  }

  return store
}

