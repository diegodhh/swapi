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
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  },
  title: {
    fontFamily: theme.typography.titles
  }

}))


function Features(props) {
  const classes= useStyles()  
  
  return (
        <>
        {!props.selectedItem && <CircularIndeterminate/>}
        <Collapse in={!!props.selectedItem} collapsedHeight={'0px' }>
        <main className={classes.root}>
         
        <Typography classes={{root:classes.title}} color='primary' variant="h5" component="h2">
          {props.selectedItem[Object.keys(props.selectedItem)[0]]}
         </Typography>
          <NestedList item={props.selectedItem} select={props.selectItemInsideDetail} schema={props.schema} icon={deathStar }/>
          </main> 
          </Collapse> 
        </>
         
        )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features)