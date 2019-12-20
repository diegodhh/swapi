import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {RadarSpinner} from 'react-epic-spinners'

const useStyles = makeStyles(theme => ({
  root: {
    opacity: 0.7,
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    
    
  },
}));



export default function CircularIndeterminate({size}) {
  const classes = useStyles();
  let sizeObject;
  if (!size) {
     sizeObject=null;
  }
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <RadarSpinner size={80} color={theme.palette.primary.main}/>
   
    </div>
  );
}