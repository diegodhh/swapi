import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as actionCreators  from '../../redux/actions/action-creators';
import {connect} from 'react-redux';
// const mapStateToProps = state => ({ characters: state.data.characters,
//   movies: state.data.movies })

  const mapDispatchToProps = () => {
    return {
      selectResource: actionCreators.selectResource
    }
  }






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

function Nav(props) {
  const classes = useStyles();
  useEffect(() => {
      
    props.selectResource('Characters')
    
  })
  return (
    <nav className={classes.root}>
    
      <List classes={{root: classes.flexCenter}} component="nav" aria-label="secondary mailbox folders">
        <ListItem onClick={()=>{props.selectResource('Characters')}} classes={{root: classes.flexCenter}} button>
          <ListItemText  primary="Personajes" />
        </ListItem>
        <ListItem onClick={()=>{props.selectResource('Movies')}} classes={{root: classes.flexCenter}} button>
          <ListItemText  primary="Peliculas" />
        </ListItem>
        {/* <ListItemLink classes={{root: classes.flexCenter}}href="#simple-list">
          <ListItemText classes={{root: classes.flexCenter}} secondary="Spam" />
        </ListItemLink> */}
      </List>
    </nav>
  );
}


export default connect(
  null,
  mapDispatchToProps
)(Nav)



