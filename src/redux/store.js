import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import createReducer from './reducers/index'
import {myMiddlewares} from './middlewares/index'
const middlewares = [myMiddlewares,thunk]


const rootReducer = createReducer()

const store = createStore(rootReducer,compose(
  applyMiddleware( ...myMiddlewares,thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;