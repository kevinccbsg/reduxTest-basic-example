'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'CHANGE_NAME':
      {
        // return state = Object.assign({}, state, { name: action.payload });
        return state = _extends({}, state, { name: action.payload });
        break;
      }
    case 'CHANGE_AGE':
      {
        // return state = Object.assign({}, state, { age: action.payload });
        return state = _extends({}, state, { age: action.payload });
        break;
      }
    case 'E':
      {
        throw new Error('Error user reducer' + action.payload);
      }
    default:
      return state;
  }
};

var loggerCustom = function loggerCustom(store) {
  return function (next) {
    return function (action) {
      console.log('action fired', action);
      next(action);
    };
  };
};

var error = function error(store) {
  return function (next) {
    return function (action) {
      try {
        next(action);
      } catch (e) {
        console.log('AHHHH', e);
      }
    };
  };
};

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerCustom);

var tweetsReducer = function tweetsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  return state;
};

var reducers = (0, _redux.combineReducers)({
  user: userReducer,
  tweets: tweetsReducer
});

var store = (0, _redux.createStore)(reducers, middleware);

store.subscribe(function () {
  console.log('Store changed', store.getState());
});

store.dispatch({ type: 'CHANGE_NAME', payload: "Will" });
//store.dispatch({type: 'E', payload: 'Error forzado'});
store.dispatch({ type: 'CHANGE_AGE', payload: 35 });
store.dispatch(function (dispatch) {
  dispatch({ type: 'CHANGE_NAME', payload: 'asyn' });
  // DO ASYNC
  _unirest2.default.get('http://swapi.co/api/people/1/').end(function (response) {
    dispatch({ type: 'CHANGE_AGE', payload: response.body.height });
  });
  dispatch({ type: 'CHANGE_AGE', payload: 1000 });
});
