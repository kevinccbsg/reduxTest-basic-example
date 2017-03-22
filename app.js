import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import unirest from 'unirest';

const userReducer = (state={}, action) => {
  switch(action.type) {
    case 'CHANGE_NAME': {
      // return state = Object.assign({}, state, { name: action.payload });
      return state = {...state, name: action.payload };
      break;
    }
    case 'CHANGE_AGE': {
      // return state = Object.assign({}, state, { age: action.payload });
      return state = {...state, age: action.payload };
      break;
    }
    case 'E': {
      throw new Error('Error user reducer'+ action.payload);
    }
    default:
      return state;
  }
};

const loggerCustom = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action);
};

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log('AHHHH', e);
  }
};

const middleware = applyMiddleware(thunk, loggerCustom);

const tweetsReducer = (state=[], action) => {
  return state;
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers,middleware);

store.subscribe(() => {
  console.log('Store changed', store.getState());
});


store.dispatch({type: 'CHANGE_NAME', payload: "Will"});
//store.dispatch({type: 'E', payload: 'Error forzado'});
store.dispatch({type: 'CHANGE_AGE', payload: 35 });
store.dispatch(dispatch => {
  dispatch({type: 'CHANGE_NAME', payload: 'asyn'});
  // DO ASYNC
  unirest.get('http://swapi.co/api/people/1/')
  .end(response => {
    dispatch({type: 'CHANGE_AGE', payload: response.body.height});
  });
  dispatch({type: 'CHANGE_AGE', payload: 1000});
});
