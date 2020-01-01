import * as Resources from './Models/Resources';
import actions from '../actions/action-types';
const {Resource} = Resources



export default function (data = {resources:{}, current:{}, selectedResource:'Characters'}, action) {
  const {actionType, signature} = Resource.separeteSignatureFromAction(action.type)
  // global actionsss 
    if (signature === actions.global_signature) {
      if (actionType === actions.select_resource) {
        if (action.payload !== data.selectedResource) {
          data = swapCurrent(data,{...action,type: actionType})
          const resource= new Resources[data.selectedResource](data.current);
          let currentState = resource.reducer({type:actionType, payload: action.payload});
  
          return {...data, current: currentState}
        }
        
      } 
    }
   

   //// not global actionsss
/// polimorphic way of creating actions and reducers, respecting the serializable data of the store, and Immutability   
    
    if (!actionType) {
      const resource= new Resources[data.selectedResource](data.current);
      let currentState = resource.reducer({type:null});
      // alert('no action')
      return {...data, current: currentState} 
    }
    
    if (signature && signature !== data.selectedResource) {
      // alert('signature desigual a recurso')
      return {...data} 
    }
    const resource= new Resources[data.selectedResource](data.current);
    let currentState = resource.reducer({type:actionType, payload: action.payload});
   
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