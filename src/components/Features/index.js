import NestedList from './NestedList'
import CircularIndeterminate from './../spiner';
import {makeStyles, Typography } from '@material-ui/core';

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../redux/actions/action-creators';
import Collapse from '@material-ui/core/Collapse';
import UndoIcon from '@material-ui/icons/Undo';
  import IconButton from '@material-ui/core/IconButton';
  import coverImg from './../../img/covers/vertical-cover.jpg';

const mapStateToProps = state => ({ selectedItem: state.data.current.selectedItem,
  schema: state.data.current.dataSchema, fetching : state.data.current.fetching })

  const mapDispatchToProps = dispatch => {
    return {
      selectItemInsideDetail: actionCreators.selectItemInsideDetail,
    }
  }




const useStyles = makeStyles(theme => ({
  root: {
    height: theme.layout.appHeight,
    borderRadius: theme.layout.borderRadius,
    opacity: 1,
    padding: '1rem 2rem',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    
    position: 'absolute',
    right: 0,
    top: 0,
    [theme.breakpoints.down('sm')]: {
      
     
      top: '0px' , 
      left: '0px' ,
      zIndex: 1000,
      width: '100%',
      opacity: 1
    }
    ,['&::before'] : {
     
      backgroundColor: theme.palette.background.defaultTranslucide,
      content: '""',
      width: '100%',
      height: '100%',
      
      zIndex: -200,
      top: 0,
      left: 0,
      position: 'absolute',
     
      borderRadius: theme.layout.borderRadius,
    }
    
    ,['&::after'] : {
     
      backgroundImage: `url(${coverImg})`, 
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      content: '""',
      width: '100%',
      height: '100%',
      zIndex: -700,
      filter: 'grayscale(20%) sepia(20%) brightness(0.4)',
      top: 0,
      left: 0,
      position: 'absolute',
     
      borderRadius: theme.layout.borderRadius,
    }

  },
  title: {
    fontFamily: theme.typography.titles
  }

}))


function Features(props) {
  const classes= useStyles()  
 
  return (
        <>
       
        <main  className={classes.root}>
        
        {!props.selectedItem && <CircularIndeterminate/>}
        <Collapse in={!!props.selectedItem} collapsedHeight={'0px' }>
        <div >
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
        <Typography classes={{root:classes.title}} color='primary' variant="h5" component="h2">
          {props.selectedItem[Object.keys(props.selectedItem)[0]]}
         </Typography>
         { props.isPhone &&  
                  <IconButton 
                  onClick={props.toggleFeatures}
                  edge="start"
                  // className={classes.moreIcon}
                  color=""
                  aria-label="open drawer">
               <UndoIcon fontSize={'large'} color= '' />
               </IconButton >}

        </div>
        
          <NestedList item={props.selectedItem} select={props.selectItemInsideDetail} schema={props.schema}/>
          </div>
          </Collapse> 
          
          </main>
       
          
        </>
         
        )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features)