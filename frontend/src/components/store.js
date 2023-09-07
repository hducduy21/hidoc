const { createStore } = require('redux');
const { default: rootReducer } = require('~/components/reducers');

const store = createStore(rootReducer);
export default store;