import actions from '../actions/action-types';
import * as ActionResources from '../actions/Models/Resources'
import * as ReducerResources from '../reducers/Models/Resources'



export const populateItem =({dispatch, getState}) => next => action => {
    if (action.type === actions.select_item+`[${actions.global_signature}]`) {
        
        const {data} = getState(); 
        const resourceReducer= new ReducerResources[data.selectedResource](data.current);
        const currentState = resourceReducer.reducer({...action, type:  actions.select_item});
        const keysToPopulate = resourceReducer.getKeysToPopulate()

       
        const item = currentState.selectedItem;
        
        if (!item) {
            next(action)
            return
        }
        const itemIndex = currentState.selectedItemIndex;

        const resourceAction= new ActionResources[data.selectedResource]()
        resourceAction.createAction({type: actions.select_item_by_index, payload: itemIndex}, dispatch, getState)
        resourceAction.createAction({type: actions.populate_item, payload: {index: itemIndex, item, keysToPopulate}}, dispatch, getState, next)
        
       
        
        
 
        
} else {
    next(action)
}
}

export const populateResource =({dispatch, getState}) => next => action => {
    if (action.type === actions.select_resource+`[${actions.global_signature}]`) {
        next(action)
        const resourceAction= new ActionResources[action.payload]() 
        resourceAction.createAction({type: actions.populate_resource},dispatch, getState)
        
} else {
    next(action)
}
}
export const changeScreenAndSearch =({dispatch, getState}) => next => action => {
    if (!action.type) {
        next(action)
        return
    }
    if (action.type.toString().indexOf(actions.select_item_inside_detail.toString()) !== -1) {
        const {data} = getState();
    
      
       const {Resource} = ReducerResources;
        const {actionType, signature} = Resource.separeteSignatureFromAction(action.type);
      
        const actionResource = new ActionResources[signature]()
        
        actionResource.createAction({type: actions.select_resource, payload: action.payload.resource}, dispatch,getState,next);


      
         
            const searchStr = action.payload.str;
          
            waitForMoviesScreen()
            let problem = false;
            const newScreenResource = new ActionResources[action.payload.resource]()
            setTimeout(function(){ problem = true }, 5000);
                        
                        function waitForMoviesScreen() {
                        
                        
                            setTimeout(()=>{
                            const {data} = getState(dispatch, getState);
                            if (problem) {
                                alert('hubo un problema che, sorry')
                                return;
                                
                            }
                            if (data.current.fetchedData && data.selectedResource === action.payload.resource) {
                                newScreenResource.createAction({type: actions.search_item, payload: searchStr},dispatch, getState)
                               
                              
                                
                            } else {
                                
                                console.log('madnness')
                                waitForMoviesScreen()
                            }
                    }, 50)
            
            
            
                         

    

      



        }
        
         
        next(action)
    } else {
        next(action)
    }
    
    

}

export const myMiddlewares = [populateItem,populateResource,changeScreenAndSearch];


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