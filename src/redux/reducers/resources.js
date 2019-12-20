import * as Resources from './Models/Resources';
import actions from '../actions/action-types';




export default function (data = {resources:{}, current:{}, selectedResource:'Characters'}, action) {
 
    if (action.type === actions.select_resource) {
      if (action.payload !== data.selectedResource) {
        data = swapCurrent(data,action)
      }
      
    } 

   
/// polimorphic way of creating actions and reducers, respecting the serializable data of the store, and Immutability   
    
    const resource= new Resources[data.selectedResource](data.current);
    let currentState = resource.reducer(action);
   
  return {...data, current: currentState} 








 


}



const swapCurrent = (data, action)=>{
  const resourceName = data.current.resourceName
  data.resources[resourceName] = {...data.current};
  if  (data.resources[action.payload]) {
      data.current = {...data.resources[action.payload]};
  }    else {
      data.current = {};
      
  }
  data.selectedResource = action.payload
  /// cleaning the searchField in the swap;
 
  return {...data}

}