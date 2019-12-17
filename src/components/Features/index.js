import NestedList from './NestedList'
import CircularIndeterminate from './../spiner';
import {makeStyles, Typography } from '@material-ui/core';
import deathStar from './../../img/death-star.svg'
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../redux/actions/action-creators';

const mapStateToProps = state => ({ selectedItem: state.data.current.selectedItem,
  schema: state.data.current.dataSchema, fetching : state.data.current.fetching })

  const mapDispatchToProps = dispatch => {
    return {
      selectItemInsideDetail: actionCreators.selectItemInsideDetail,
    }
  }




const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem 2rem',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }

}))


function Features(props) {
  const classes= useStyles()  
  if (props.fetching) {
   return (<CircularIndeterminate/>) 
  }
  return (
        <>
        <main className={classes.root}>
         
        <Typography variant="h5" component="h2">
          {props.selectedItem[Object.keys(props.selectedItem)[0]]}
         </Typography>
          <NestedList item={props.selectedItem} select={props.selectItemInsideDetail}schema={props.schema} icon={deathStar }/>
          </main> 
        </>
         
        )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features)