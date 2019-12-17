import React, {useCallback,useState, useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {connect} from 'react-redux'
import * as actionCreators  from '../../redux/actions/action-creators';
import CircularIndeterminate from './../spiner';
import Collapse from '@material-ui/core/Collapse';



const mapStateToProps = state => ({ currentList: state.data.current.displayList,
fetching: state.data.current.fetching })

  const mapDispatchToProps = dispatch => {
    return {
      selectItem: actionCreators.selectItem,
      fetchMore: actionCreators.fetchMore
    }
  }

  
const useStyles = makeStyles(theme => ({
  
  root: {
    marginBottom: '10px',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '80vh'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const ScrollList = (props) => {
  const listElement = useRef(null)

useEffect(() => {
  
  return () => {
    const overFlow = listElement.current.clientWidth < listElement.current.scrollWidth || listElement.current.clientHeight < listElement.current.scrollHeight
    if (!overFlow) {
      setTimeout(()=>{
       
        props.fetchMore()
      }, 5000)
     
    }
  };
}, [])
  
  
  const [onBottom, setBottom] = useState(false)
 
  
 
  const handleScroll = useCallback((e) =>{
    
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    
    
    if (e.target.scrollHeight - e.target.scrollTop -20>= e.target.clientHeight) {
      setBottom(false)
    }
   
      
    if (bottom && !props.fetching) { 
        setBottom(true)
        props.fetchMore()
       }
      
    
  })
   
  
  
  const classes = useStyles();
  const tag = props.currentList.length? Object.keys(props.currentList[0])[0] : 'Loading'; 
 
  
  return (


    <List ref={listElement} onScroll={handleScroll} className={classes.root} subheader={<li />}>
      {[tag].map(sectionId => (
        <li  key={`section-${sectionId}`} className={classes.listSection}>
          
            <ListSubheader>{`${sectionId}`}</ListSubheader>
            {props.currentList.map((item, index) => (
              <ul key={`item-${sectionId}-${item[Object.keys(item)[0]]}`} className={classes.ul}>
              <ListItem button key={`item-${sectionId}-${item[Object.keys(item)[0]]}`}>
                <ListItemText onClick={()=>{props.selectItem(index)}} primary={item[Object.keys(item)[0]]} />
              </ListItem>
             </ul>
            ))}
             
             {
              ( <Collapse in={onBottom} collapsedHeight={0}>
                 
                      <ul key={`white space `} className={classes.ul}>
                        <ListItem style={{height:'60px'}} key={`white space `}>
                          <ListItemText  primary='' />
                        </ListItem>
                    </ul>
              </Collapse> )
             }
             {
               props.fetching &&  <CircularIndeterminate/>
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

