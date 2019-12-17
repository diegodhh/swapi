import * as Resources from './Models/Resources';
import actions from '../actions/action-types';




export default function (data = {resources:{}, current:{}, selectedResource:'Characters'}, action) {
 
    if (action.type === actions.select_resource) {
      if (action.payload !== data.selectedResource) {
        data = swapCurrent(data,action)
      }
      
    } 

    if (['Characters', 'Movies', 'Resource'].indexOf(data.selectedResource) === -1){
      throw {msg: 'El recurso no es una pelicula ni nada che'}
    }
   
    
    const resource= new Resources[data.selectedResource](data.current);
    let currentState = resource.reducer(action);
   
  return {...data, current: currentState} 
  //  return {...state, currentState}







 


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