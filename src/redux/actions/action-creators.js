import actions from './action-types';
import * as Resources from './Models/Resources';
import store from './../store';


const {dispatch}= store;

const {fetch_data,fetch_more, select_resource, select_item,search_item} = actions;
  
  export const fetchData = () => {
   
    console.log('data')
   dispatch((dispatch, getState) => {
   
      const {data} = getState();
      
      
      const resource= new Resources[data.selectedResource]
      resource.createAction({type:fetch_data}, dispatch, getState)
      
   }
   )
   
  }
  export const fetchMore = () => {
   
    console.log('data')
   dispatch((dispatch, getState) => {
   
      const {data} = getState();
      
      
      const resource= new Resources[data.selectedResource]
      resource.createAction({type:fetch_more}, dispatch, getState)
      
   }
   )
   
  }



  export const selectResource = (resource) => {
      
  
 dispatch((dispatch, getState) => {
   const {data} = getState();
   if (data.current.fetching) {
      return 
   }
      dispatch({type: select_resource,
            payload: resource
    })
    
      if (!data.resources[resource]) {
        fetchData()
      }
      
      
      
   }
  )
   
  }

  
  export const selectItem = (index) => {
   
   
      dispatch ({type:select_item,
      payload: index})
      
   
   
   
  }
  export const selectItemInsideDetail = (value) => {
   
  
   dispatch ({type:actions.select_item_inside_detail,
   payload: value})
   



}

  export const searchItem = (str) => {
   
    console.log('data')
   dispatch((dispatch, getState) => {
   
      const {data} = getState();
      
      
      const resource= new Resources[data.selectedResource]
      resource.createAction({type:search_item, payload: str}, dispatch, getState)
      
   }
   )
   
  }