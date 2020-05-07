const { combineEpics, createEpicMiddleware, ofType } = require('redux-observable');
const { applyMiddleware, combineReducers, createStore } = require('redux');
const { delay, mapTo } = require('rxjs/operators');

const PING = 'PING';
const PONG = 'PONG';

const ping = () => ({ type: PING });
const pong = () => ({ type: PONG });

const pingEpic = action$ => action$.pipe(
  ofType(PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(pong())
);

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };
    case 'PONG':
      return { isPinging: false };
    default:
      return state;
  }
};

const rootEpic = combineEpics(
  pingEpic
);

const rootReducer = combineReducers({
  pingReducer
});

const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(rootEpic);
  return store;
}

module.exports = configureStore;
