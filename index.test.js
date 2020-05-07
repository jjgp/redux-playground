const configureStore = require('./index');

test('PING PONG', done => {
  const store = configureStore();
  let count = 0;
  store.subscribe(() => {
    console.log(store.getState());
    count++;
    count > 1 && done();
  });
  store.dispatch({ type: 'PING' });
});
