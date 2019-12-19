import actions from "../action-types";
import axios from 'axios';




export class Resource {
    constructor(currentState={}) {
        
        this.actions = actions;
        this.URL = '' 
        

    }
    createAction =  (action,dispatch,getstate) => {     

                if (this[action.type]) {
                
                     this[action.type](action,dispatch,getstate)
                      
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
                type: action.type,
                payload: response.data 
              })
              dispatch({   
                type: actions.select_item 
              })
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
            payload: err.data 
          })
       

   }
   [actions.search_item] = (action, dispatch,getstate) => {
    //this[actions.show_spin](dispatch)
        const {data} = getstate()
        if (data.current.nextPageLink) {
            this._searchOnline(action, dispatch,getstate)
        } else {
            this._searchOffLine(action, dispatch,getstate)
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
   
    _searchOffLine = async (action, dispatch,getstate) =>{
        dispatch({   
            type: action.type,
            payload: action.payload
          })
          dispatch({   
            type: this.actions.select_item   
        })
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
              dispatch({   
                type: this.actions.select_item   
            })
            
        } catch(err) {
            this[actions.conection_error](dispatch, err)
        }
     }
    
   
    


   
}

export class Characters extends Resource {
    constructor(currentState) {
        super()
    
        this.searchApi = 'https://swapi.co/api/people/?search='
        this.URL = 'https://swapi.co/api/people';
        this.ResourseName = 'Characters'   
    }
    
      
    
}

 
export class Movies extends Resource {
    constructor() {
        super()
        this.URL = 'https://swapi.co/api/films';
        this.ResourseName = 'Movies'
    }
    
}
export class Starships extends Resource {
    constructor() {
        super()
        this.URL = 'https://swapi.co/api/starships/';
        this.ResourseName = 'Starships'
    }
    
}

export class Vehicles extends Resource {
    constructor() {
        super()
        this.URL = 'https://swapi.co/api/vehicles/';
        this.ResourseName = 'Vehicles'
    }
    
}

export class Species extends Resource {
    constructor() {
        super()
        this.URL = 'https://swapi.co/api/species/';
        this.ResourseName = 'Species'
    }
    
}

export class Planets extends Resource {
    constructor() {
        super()
        this.URL = 'https://swapi.co/api/planets/';
        this.ResourseName = 'Planets'
    }
    
}


