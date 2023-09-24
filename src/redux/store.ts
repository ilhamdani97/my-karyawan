import React from 'react';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducer';
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['root'] // which reducer want to store
};

// const reducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

// if (process.env.NODE_ENV === 'development') {
//     middleware = applyMiddleware(thunk, logger);
// } else {
//     middleware = applyMiddleware(thunk);
// }

const store = createStore(rootReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };