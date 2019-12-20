import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import createReducer from './reducers/index'
import {populateItem, changeScreenAndSearch} from './middlewares/index'



const rootReducer = createReducer()

const store = createStore(rootReducer,compose(
  applyMiddleware( populateItem,changeScreenAndSearch,thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;