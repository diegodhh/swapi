import actions from "../../actions/action-types";


/// polimorphic way of creating actions and reducers, respecting the serializable data of the store, and Immutability


export class Resource {
    constructor(currentState={}) {
        
        
        
        const {resourceName, fetchedPages, backUpSelectedItemIndex, displayList,searchField,displayName,selectedItem,selectedItemIndex, nextPageLink,fetchedData} = currentState;
        this._state = {}
        this._state.resourceName = resourceName || '';
        this._state.displayName = displayName || '';
        this._state.displayList = displayList || [] ;
        this._state.searchField = searchField || '';
        this._state.fetchedData = fetchedData || null;
        this._state.selectedItem = selectedItem || '';
        this._state.selectedItemIndex = selectedItemIndex || 0;
        this._state.backUpSelectedItemIndex = backUpSelectedItemIndex || null;
        this._state.nextPageLink= nextPageLink || null;
        this._state.fetching = false;
        this._state.fetchedPages = fetchedPages || [];
        this.ResourseName = 'Resource'
        this._state.dataSchema =  {name: String};

    }
    static separeteSignatureFromAction = (type) =>{
        if (type.indexOf('[')!== -1) {
                const actionType = type.split('[')[0];
                let signature = type.split('[')[1];
                signature = signature.split(']')[0];
            return {actionType, signature}
            }
            else {
                return false;
            }
    }
    reducer = (action) => {
        
        if (this[action.type]) {
            this[action.type](action)
        }
       
        return this._state;
    }
    get state() {
        return this._state;
    } 
    
    
    [actions.populate_resource] = (action) => {
        this._state.fetchedData = action.payload
        this._state.displayList = action.payload.results
        this._state.selectedItemIndex = 0;
        this._state.selectedItem = this._state.displayList[this._state.selectedItemIndex];
        this._state.nextPageLink = action.payload.next;
        this._state.fetching = false;
        return this._state;
    }
    [actions.show_spin] = (action) => {
       
        this._state.fetching = true;
        return this._state;
    }
    [actions.populate_item] = (action) => {
        // the item it's only replaces when the user is still selecting the same item. 
        let keysToPopulate = this.getKeysToPopulate()

        keysToPopulate.map((keyToPopulate)=>{
            if (this._state.selectedItemIndex !== action.payload.index ||  Object.keys(action.payload.item[keyToPopulate][0])[0] === 'msg' ) {
             
                return this._state;
             
             }
        })
        
        
        this._state.selectedItem = action.payload.item;
     
        return this._state; 
            
        }
       
    
    [actions.select_item_by_index] = (action) => {
       
        const itemIndex= action.payload !== undefined? action.payload : this._state.selectedItemIndex;;
        this._state.selectedItemIndex = itemIndex;
        const list = this._state.displayList;
        this._state.selectedItem = list[itemIndex];

        return this._state;
    }
    
    [actions.search_item] = (action) => {
        if (this._state.nextPageLink) {
            this._searchOnline(action)
        } else {
            this._searchOffLine(action)
        }
        
        
        return this._state;
    }
    [actions.fetch_more] = (action) => {
        
        this._state.fetchedPages.push(action.payload);
        this._state.displayList = this._state.displayList.concat(action.payload.results); 
        this._state.nextPageLink = action.payload.next;
        this._state.fetching = false;
        return this._state;
    }
    [actions.select_item] = (action) =>{
        if (action.payload === undefined || action.payload ===  null) {
            action.payload=this._state.selectedItemIndex;
        }
        this._state.selectedItemIndex = action.payload;
        this._state.selectedItem = this._state.displayList[this._state.selectedItemIndex]
    }
    
    _getCompleteList = () =>{
        let completeList = this._state.fetchedData.results;
         this._state.fetchedPages.forEach((item)=>{
            completeList = completeList.concat(item.results);
        })
        
        return completeList;
    }
    // make a back up during searching for load the first result in search
    _searchIndexOn = () =>{
        if  (this._state.backUpSelectedItemIndex === null) {
            this._state.backUpSelectedItemIndex = this._state.selectedItemIndex;
        }
        this._state.selectedItemIndex = 0; 
    }
    // restore the last index selected before start searching
    _searchIndexOff = (str) =>{
        if  (str === '') {
             this._state.selectedItemIndex = this._state.backUpSelectedItemIndex;
             this._state.backUpSelectedItemIndex = null;    
        }
         
    }
    // search using data in memory
    _searchOffLine = (action)=>{
        this._searchIndexOn()

        let str = action.payload;
        this._state.searchField = str;
        str = str.toLowerCase();
        str = str.replace(/\s/g, '');
        str = str.replace(/[^\w\s]/gi, '')
       
        const completeList = this._getCompleteList()
        
        this._state.displayList = completeList.filter((item, index)=>{
            let first = item[Object.keys(item)[0]];
            first = first.toLowerCase();
            first = first.replace(/\s/g, '');
            first = first.replace(/[^\w\s]/gi, '')
            return first.indexOf(str) !== -1
           

        })
        
        this._searchIndexOff(this._state.searchField)
    }
    //sarch in the nextlink page is it is available
    _searchOnline = (action) =>{
        this._searchIndexOn()
        let str = action.payload.str; 
        if (str === '') {
            this._state.searchField = str;
            this._state.displayList = this._getCompleteList()  
            return
        }
        // if it is false means is searching but is typing and waiting for a resulta, only apdate the fieldsearch
        if (action.payload.list === false) {
            
            
            this._state.searchField = str;
            return this._state;
        } else {
            
            this._state.displayList = action.payload.list 
            
            
        }
        
     
        
        
       
        

        
        
        this._searchIndexOff(str)

        
    } 
    
    getKeysToPopulate = () => {
        const keysToPopulate = []
        for (const key in this._state.dataSchema) {
            if (this._state.dataSchema[key].resource) {
                keysToPopulate.push(key)
            }
          }
          return keysToPopulate;
    }
   

}




export class Characters extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema =  {name: {type: String, displayName: 'nombre'},
            height:{type: Number, displayName:'altura'},
            mass: {type:String, displayName: 'peso'},
            eye_color: {type:String, displayName: 'color de ojos'},         
            films: {type:Array, resource: 'Movies',  displayName: 'Peliculas'}
            } ;
       
      
        this._state.resourceName = 'Characters'
        this._state.displayName = 'Personajes'   
    }
  
  
        
       

 
}
export class Movies extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema = {title: {type:String, displayName: 'Titulo'}, 
        director: {type:String, displayName: 'Director'}, 
        producer: {type:String, displayName: 'Productor'}, 
        release_date: {type:Date, displayName: 'Fecha de estreno'},
        characters: {type:Array, resource: 'Characters',  displayName: 'personajes'}
    }; 
        this._state.resourceName = 'Movies'
        this._state.displayName = 'Peliculas'
    }
    
}

export class Starships extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema = {name: {type:String, displayName: 'Nombre'}, 
        manufacturer: {type:String, displayName: 'Fabricante'}, 
        cost_in_credits: {type:Number, displayName: 'Precio'}, 
        passengers: {type:Date, displayName: 'pasajeros'},
        films: {type:Array, resource: 'Movies',  displayName: 'Peliculas'}
    }; 
        this._state.resourceName = 'Starships'
        this._state.displayName = 'Naves espaciales'
    }
    
}

export class Planets extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema = {name: {type:String, displayName: 'Nombre'}, 
        orbital_period: {type:Number, displayName: 'periodo de orbita'}, 
        population: {type:Number, displayName: 'poblacion'}, 
        gravity: {type:Number, displayName: 'gravedad'},
        films: {type:Array, resource: 'Movies',  displayName: 'Peliculas'}
    }; 
        this._state.resourceName = 'Planets'
        this._state.displayName = 'Planetas'
    }
    
}

export class Vehicles extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema = {name: {type:String, displayName: 'Nombre'}, 
        model: {type:Number, displayName: 'Modelo'}, 
        max_atmosphering_speed: {type:Number, displayName: 'Maxima Velocidad'}, 
        manufacturer: {type:Number, displayName: 'fabricante'}
    }; 
        this._state.resourceName = 'Vehicles'
        this._state.displayName = 'vehiculos'
    }
    
}


export class Species extends Resource {
    constructor(currentState) {
        super(currentState)
        this._state.dataSchema = {name: {type:String, displayName: 'Nombre'}, 
        eye_colors: {type:Number, displayName: 'Color de ojos'}, 
        average_lifespan: {type:Number, displayName: 'Promedio de vida'}, 
        language: {type:String, displayName: 'lenguaje'},
        people: {type: Array, resource: "Characters", displayName: "Personajes"},
        films: {type:Array, resource: 'Movies',  displayName: 'Peliculas'}
    }; 
        this._state.resourceName = 'Species'
        this._state.displayName = 'Especies'
    }
    
}

// this._state.dataSchema = {title: String, 
//     episode_id: Number, 
//     opening_crawl:  String, 
//     director: String, 
//     producer: String, 
//     release_date: Date}; 



