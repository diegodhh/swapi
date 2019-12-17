import actions from './../actions/action-types';
import * as Resources from './../reducers/Models/Resources'
import axios from 'axios';
import {fetchData} from './../actions/action-creators'

export const populateItem =({dispatch, getState}) => next => action => {
 
    
    if (action.type === actions.select_item) {
        
       
        
        
        (async () => {
            const {data} = getState(); 
        const itemIndex = action.payload || data.current.selectedItemIndex;
        const item = data.current.displayList[itemIndex]
        if (!item) {
            next(action)
            return
        }
        dispatch({
            type: actions.select_item_by_index, payload: action.payload
        })    
        if (data.selectedResource === 'Characters') { 
                // has to populate the movie array
               
                const films = await item['films'].map(async (item, index)=>{
                    try {
                        let response = await axios.get(item,
                            {
                              headers: {
                             'Content-Type': 'application/json'
                           }})
                         
                        return response.data   
                       
                    } catch(err) {
                        return {msg: 'nodisponible'}
                        alert('error')
                    }
                  
                })
                
                item['films']=await Promise.all(films)
                
               
                dispatch({
                    type: actions.populate_item, payload: {index: itemIndex, item, resourceName: data.current.resourceName}
                }) 
            }
            
    
           
        })()
      
    
  } else {
    next(action) 
  }

}
export const changeScreenAndSearch =({dispatch, getState}) => next => action => {
    if (action.type === actions.select_item_inside_detail) {
        const {data} = getState();
      
        if (data.selectedResource === 'Characters') {
            const payloadClone = action.payload; 
            const searchStr = payloadClone;
            dispatch({type: actions.select_resource, payload: 'Movies'})
            if (!data.resources['Movies']) {
            
                fetchData()
            }
            waitForMoviesScreen()
            let problem = false;
            setTimeout(function(){ problem = true }, 5000);
            
                        function waitForMoviesScreen() {
                        
                        
                            setTimeout(()=>{
                            const {data} = getState(dispatch, getState);
                            if (problem) {
                                alert('hubo un problema che, sorry')
                                return;
                                
                            }
                            if (data.current.fetchedData && data.selectedResource === 'Movies') {
                                dispatch({type: actions.search_item, payload: searchStr})
                                
                            } else {
                                
                                console.log('madnness')
                                waitForMoviesScreen()
                            }
                    }, 50)
            next(action)         

        } 

          next(action)



        }
        
         

    } else {
        next(action)
    }
    
    

}




//generic way for all apis
  // const {data} = getState();
        // const itemIndex = actions.payload || 0;
        // const Resource = Resources.Resource
        // const {data} = getState()

        // const currentResource= new Resources[data.selectedResource](data.current);
        // const {item, arrayToPopulate} = currentResource.getFirstArrayToPopulate(itemIndex);
        // let classOfResource = Resource.getClassOfResource(arrayToPopulate)
        // const sourceResource = new Resources[classOfResource](data.resources[classOfResource]);
        // const {newArray, notFound} = sourceResource.findInDisplayList(arrayToPopulate);  
        // if (notFound.lenght !== 0) {
        //     item = {...item, newArray}
        //     action.payload = {index: itemIndex, item: item}
        //     next(action);
        // } 