import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(theme => ({
  root: {
    
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  multiList: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }
  },
  flexCenter: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
    
      <List classes={{root: classes.flexCenter}} component="nav" aria-label="secondary mailbox folders">
        <ListItem classes={{root: classes.flexCenter}} button>
          <ListItemText primary="Personajes" />
        </ListItem>
        <ListItem classes={{root: classes.flexCenter}} button>
          <ListItemText primary="Peliculas" />
        </ListItem>
        {/* <ListItemLink classes={{root: classes.flexCenter}}href="#simple-list">
          <ListItemText classes={{root: classes.flexCenter}} secondary="Spam" />
        </ListItemLink> */}
      </List>
    </nav>
  );
}