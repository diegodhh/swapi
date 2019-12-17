import { combineReducers } from 'redux';
import data from './resources'


/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
   
    data: data,
    ...injectedReducers,
  });

  return rootReducer;
}