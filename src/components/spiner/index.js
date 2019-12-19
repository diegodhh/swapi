import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" {...sizeObject}  />
    </div>
  );
}