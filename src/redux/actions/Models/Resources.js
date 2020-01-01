import actions from "../action-types";
import axios from 'axios';





export class Resource { 
    constructor(currentState={}) {
        
        this.actions = actions;
        this.URL = '' 
        

    }
    createAction =  (action,dispatch,getstate,next) => {     
        const dispatchWithFirm = this.dispatchWarper(dispatch)
                if (this[action.type]) {
                
                     return this[action.type](action,dispatchWithFirm,getstate,next)
                      
                } else {
                    return next
                }
                             
    }
  
      
  
    [actions.fetch_data] = async (action, dispatch,getstate) => {
        //this[actions.show_spin](dispatch)
        try {
            const {data} = getstate()
            if (data.current.fetching) {
                return;
            }
            if (data.current.fetchedData !== null) {
                return;
            }
            
            
            this[actions.show_spin](dispatch)
            let response = await axios.get(this.URL,
                {
                  headers: {
                 'Content-Type': 'application/json'
               }})
               dispatch({   
                type: actions.fetch_data,
                payload: response.data 
              })
              this[actions.select_item]({   
                type: actions.select_item, payload: 0 
              },dispatch,getstate)
        } catch(err) {
            alert('este es el error')
            console.log(err)
            this[actions.conection_error](dispatch, err)
        }
       
           
       
        

    }
    [actions.populate_resource] = async (action, dispatch,getstate) => {
        //this[actions.show_spin](dispatch)
        try {
            const {data} = getstate()
            if (data.resources[this.ResourseName]) {
                if (data.resources[this.ResourseName].fetchedData !== null) {
                    return;
                }
                if (data.current.fetching) {
                    return;
                }
            }
            
            
            
            
            this[actions.show_spin](dispatch)
            let response = await axios.get(this.URL,
                {
                  headers: {
                 'Content-Type': 'application/json'
               }})
               dispatch({   
                type: actions.populate_resource,
                payload: response.data 
              })
              this[actions.select_item]({   
                type: actions.select_item, payload: 0 
              },dispatch,getstate)
        } catch(err) {
  
            this[actions.conection_error](dispatch, err)
        }
       
           
       
        

    }
    
    [actions.show_spin] = (dispatch) => {
           
         dispatch({   
            type: this.actions.show_spin,
            payload: 'fetching something'
          })
        

    }
    [actions.conection_error] = (dispatch, err) => {
           
        dispatch({   
            type: this.actions.conection_error,
            payload: JSON.stringify(err) 
          })
       

   }
   [actions.search_item] = (action, dispatch,getstate) => {
    //this[actions.show_spin](dispatch)
        const {data} = getstate()
        if (data.current.fetchedData) {
            if (data.current.nextPageLink) {
                this._searchOnline(action, dispatch,getstate)
            } else {
                this._searchOffLine(action, dispatch,getstate)
            }
        }
      
        
        
    } 
    
    [actions.fetch_more] = async (action, dispatch,getstate) => {
        //this[actions.show_spin](dispatch)
        
        try {
            const {data} = getstate()
            if (data.current.fetching) {
                return;
            }
            const nextPage = data.current.nextPageLink;
            if (!nextPage) {
                return;
            }
            this[actions.show_spin](dispatch)
            let response = await axios.get(nextPage,
                {
                  headers: {
                 'Content-Type': 'application/json'
               }})
               dispatch({   
                type: action.type,
                payload: response.data 
              })
        } catch(err) {
            this[actions.conection_error](dispatch, err)
        }
       
           
       
        

    }
    
    [actions.select_resource] = async (action, dispatch,getstate) => {
       
        // const {data} = getstate();
        // const resource = action.payload
        // if (data.current.fetching) {
        //    return 
        // }
           dispatch(action, true)
         
         
           
       
        

    }
    [actions.select_item] = (action, dispatch,getstate) => {
       
       dispatch(action, true);
           
       
        

    }
    [actions.select_item_inside_detail] = (action, dispatch,getstate) => {
       
        dispatch(action);
            
        
         
 
     }
     [actions.select_item_by_index] = (action, dispatch,getstate) => {
       
        dispatch(action);
            
        
         
 
     }
    
     [actions.populate_item] = async (action, dispatch,getstate,next) => {
        const {payload} = action
        const {item, index,keysToPopulate} = payload;
        let isAlrredyFetched = false;
        try {
            let keys;
             await keysToPopulate.map(async (keyToPopulate)=>{
                keys = item[keyToPopulate].map(async (itemURL)=>{
                   try {
                    if (typeof(itemURL) === 'object' || itemURL.indexOf('https') === -1){
                        const err =new Error ({msg: 'alrredy fetched'});
                        err.next = true;
                        throw err 
                    }
                    let response = await axios.get(itemURL,
                        {
                          headers: {
                         'Content-Type': 'application/json'
                       }})
                    return response.data   
                  
                    } catch(err) {
                        isAlrredyFetched=true;
                        return;
                    }
                   
               
                    
                
              
            })
            if (isAlrredyFetched) {
                // dont do anything
                return
            }
            item[keyToPopulate]=await Promise.all(keys)
            return item[keyToPopulate];
            })
           
          await Promise.all(keys)  
            
          dispatch({
            type: actions.populate_item, payload: {index, item}
        }) 


         } catch(err) {
             if (err.next) {
                 next(action);
                 return
             } else {
                 console.log(err)
                 dispatch({type:actions.conection_error, payload: JSON.stringify(err)})
    
             }
            
         }
         
        
         
        
         
    
     }      
        
         
 
     
    


    _searchOffLine = async (action, dispatch,getstate) =>{
        dispatch({   
            type: action.type,
            payload: action.payload
          })
          this[actions.select_item]({   
            type: actions.select_item 
          },dispatch,getstate)
    }
    _searchOnline = async (action, dispatch,getstate) =>{
        try {
            let str = action.payload;
            dispatch({   
                type: action.type,
                payload: {
                    str: str,
                    list: false
                }  
              })
           
    
            
            this[actions.show_spin](dispatch)
            let searchApi =this.searchApi+str
            let response = await axios.get(searchApi,
                {
                  headers: {
                 'Content-Type': 'application/json'
               }})
               dispatch({   
                type: action.type,
                payload: {
                    str: str,
                    list: response.data.results
                }  
              })
              this[actions.select_item]({   
                type: actions.select_item 
              },dispatch,getstate)
            
        } catch(err) {
            this[actions.conection_error](dispatch, err)
        }
     }
//add a firm to the action//
    dispatchWarper = (dispatch) =>{
        
     
            return (action, noSignature)=>{
                if (noSignature) {
                    dispatch({type: action.type+`[${actions.global_signature}]`, payload: action.payload})
                    
                } else {
                    dispatch({type: action.type+`[${this.ResourseName}]`, payload: action.payload})
                }
                
            }
      
    } 
    
   
  


   
}

export class Characters extends Resource {
    constructor(currentState) {
        super(currentState)
          
        this.searchApi = 'https://swapi.co/api/people/?search='
        this.URL = 'https://swapi.co/api/people';
        this.ResourseName = 'Characters' 
  
    }
    

  
      
    
}

 
export class Movies extends Resource {
    constructor(currentState) {
        super(currentState)
        this.URL = 'https://swapi.co/api/films';
        this.ResourseName = 'Movies';
     
    }
    
}
export class Starships extends Resource {
    constructor() {
        super()
        this.searchApi = 'https://swapi.co/api/starships/?search='
        this.URL = 'https://swapi.co/api/starships/';
        this.ResourseName = 'Starships';
   
    }
    
}

export class Vehicles extends Resource {
    constructor() {
        super()
        this.searchApi = 'https://swapi.co/api/vehicles/?search='
        this.URL = 'https://swapi.co/api/vehicles/';
        this.ResourseName = 'Vehicles';
        
    }
    
}

export class Species extends Resource {
    constructor() {
        super()
        this.searchApi = 'https://swapi.co/api/species/?search='
        this.URL = 'https://swapi.co/api/species/';
        this.ResourseName = 'Species'
    }
    
}

export class Planets extends Resource {
    constructor() {
        super()
        this.searchApi = 'https://swapi.co/api/planets/?search='
        this.URL = 'https://swapi.co/api/planets/';
        this.ResourseName = 'Planets'
    }
    
}


