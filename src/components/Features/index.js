import NestedList from './NestedList'

import {makeStyles, Typography } from '@material-ui/core';
import deathStar from './../../img/death-star.svg'
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../redux/actions/action-creators';

const mapStateToProps = state => ({ selectedItem: state.data.current.selectedItem })

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

let data = `{"birth_year": "19 BBY",
"eye_color": "Blue",
"films": [
    "https://swapi.co/api/films/1/"
],
"gender": "Male",
"hair_color": "Blond",
"height": "172",
"homeworld": "https://swapi.co/api/planets/1/"}`
data = JSON.parse(data);

function Features(props) {
  const classes= useStyles()  
  return (
        <>
        <main onClick={props.selectItemInsideDetail}className={classes.root}>
         
        <Typography variant="h5" component="h2">
         obi one quenobi
         </Typography>
          <NestedList data={props.selectedItem} icon={deathStar }/>
          </main> 
        </>
         
        )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Features)