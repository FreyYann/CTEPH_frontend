
import reducers from './reducer';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

// applyMiddleware waits untill we recieve from server infromation
export const store = createStore(reducers, {}, applyMiddleware(thunk));
