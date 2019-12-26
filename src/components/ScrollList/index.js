import React, {useCallback,useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {connect} from 'react-redux'
import * as actionCreators  from '../../redux/actions/action-creators';
import CircularIndeterminate from './../spiner';
import clsx from 'clsx';



const mapStateToProps = state => ({ currentList: state.data.current.displayList,
  selectedItemIndex: state.data.current.selectedItemIndex,
fetching: state.data.current.fetching,fetching: state.data.current.fetching, fetchedPages: state.data.current.fetchedPages,fetchedData: state.data.current.fetchedData, schema: state.data.current.dataSchema })

  const mapDispatchToProps = dispatch => {
    return {
      selectItem: actionCreators.selectItem,
     
      fetchMore: actionCreators.fetchMore
    }
  }

  
const useStyles = makeStyles(theme => ({
  
  root: {
    
    borderRadius: theme.layout.borderRadius,
    marginBottom: '10px',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    overflow: 'auto',
    height: '100vh',
    textTransform: "uppercase",
    fontWeight: 800,
    color: ' white',
    opacity: theme.palette.opacity,
    [theme.breakpoints.down('sm')]: {
      position: 'absolut',
      top: '20px' , 
      left: '0px' ,
      zIndex: 500 ,
      width: '100%',
      height: '100%'
    }
    

  },
  listSection: {
    backgroundColor: 'inherit'
    
    
  },
  selectedItem: {
    backgroundColor : theme.palette.primary.dark,
    fontWeight: 800,
    '&:hover': {
      background: theme.palette.primary.dark,
    }
  },subheader:{
    fontWeight: '700',
  
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const ScrollList = (props) => {
  const listElement = useRef(null)

useEffect(() => {
 
  const overFlow = listElement.current.clientWidth < listElement.current.scrollWidth || listElement.current.clientHeight < listElement.current.scrollHeight
   
    if (!overFlow) {
      if ( !props.fetching && props.fetchedPages.length === 0) {
       
        setTimeout(()=>{
          if (!props.fetching && props.fetchedPages.length === 0) {
            props.fetchMore()
          }
        }, 5000)
      }
    }
        
      
  
    
    return ()=>{
      
    }
  
 
}, [props])
  
  

 
  
 
  const handleScroll = useCallback((e) =>{
    
    const bottom = e.target.scrollHeight - e.target.scrollTop <= 20 + e.target.clientHeight;
       
    if (bottom && !props.fetching) { 
      
       
        props.fetchMore()
       }
        
  })
   
  
 
  const classes = useStyles();
  let tag;
  if (!props.currentList.length) {
   
    if (props.fetchedData || !props.fetching) {
      tag = 'no se encontraron elementos'
    } else {
      tag = 'Loading'
    }
   
    
  } else {
    tag = props.schema[Object.keys(props.schema)[0]].displayName;
  }
  
  
  return (


    <List onClick={props.toggleFeatures} ref={listElement} onScroll={handleScroll} className={clsx(classes.root, 'laser-scroll-bar')} subheader={<li />}>
      {[tag].map(sectionId => (
        <li  key={`section-${sectionId}`}  className={classes.listSection}>
          
            <ListSubheader classes={{root:  classes.subheader}} >{`${sectionId}`}</ListSubheader>
            {props.currentList.map((item, index) => {
              let ifSelected;
              if (index === props.selectedItemIndex) {
                ifSelected = {classes : {root: classes.selectedItem}}
              }
              return (
                <ul key={`item-${sectionId}-${item[Object.keys(item)[0]]}`} className={classes.ul}>
                <ListItem {...ifSelected} button key={`item-${sectionId}-${item[Object.keys(item)[0]]}`}  onClick={()=>{props.selectItem(index)}}>
                  <ListItemText   primary={item[Object.keys(item)[0]]} />
                </ListItem>
               </ul>
              )
            })}
              {
               props.fetching &&  <CircularIndeterminate/>
             }
             {
              ( 
                <>
              <ul key={`white space `} className={classes.ul}>
              <ListItem style={{height:'60px'}} key={`white space `}>
                <ListItemText  primary='' />
              </ListItem>
               </ul>
              
              
                 
                      <ul key={`white space `} className={classes.ul}>
                        <ListItem style={{height:'60px'}} key={`white space `}>
                          <ListItemText  primary='' />
                        </ListItem>
                    </ul>
             
              </>
              )
             }
            
             
        </li>
        
      ))}
    </List>
  );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollList)

