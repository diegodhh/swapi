import NestedList from './NestedList'
import CircularIndeterminate from './../spiner';
import {makeStyles, Typography } from '@material-ui/core';
import deathStar from './../../img/death-star.svg'
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../redux/actions/action-creators';
import Collapse from '@material-ui/core/Collapse';
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
    opacity: theme.palette.opacity,
    padding: '1rem 2rem',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'absolut',
    right: 0,
    top: 0,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '0px' , 
      left: '0px' ,
      zIndex: 1000 ,
      width: '100%',
      opacity: 1
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
        <main onClick={props.toggleFeatures } className={classes.root}>
        {!props.selectedItem && <CircularIndeterminate/>}
        <Collapse in={!!props.selectedItem} collapsedHeight={'0px' }>
        <div >
         
        <Typography classes={{root:classes.title}} color='primary' variant="h5" component="h2">
          {props.selectedItem[Object.keys(props.selectedItem)[0]]}
         </Typography>
          <NestedList item={props.selectedItem} select={props.selectItemInsideDetail} schema={props.schema} icon={deathStar }/>
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