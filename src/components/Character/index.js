import NestedList from './NestedList'

import {makeStyles, Typography } from '@material-ui/core';
import deathStar from './../../img/death-star.svg'
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem 2rem',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }

}))

export default function Character() {
  const classes= useStyles()  
  return (
        <>
        <main className={classes.root}>
         
        <Typography variant="h5" component="h2">
         obi one quenobi
         </Typography>
          <NestedList icon={deathStar }/>
          </main> 
        </>
         
        )
}