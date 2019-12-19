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
  const mapStateToProps = ({data}) => ({ selectedResource: data.selectedResource})






const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.layout.borderRadius,
    opacity: theme.palette.opacity,
    height: theme.layout.appHeight,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    textTransform: "uppercase",
    fontWeight: 800,
    color: 'white', 
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '0px' , 
      left: '0px' ,
      zIndex: 1000 }

  },
  fontStyle: {
    fontFamily: 'jediFont',
  },
  selectedItem: {
    backgroundColor : theme.palette.primary.dark,
    fontWeight: 800,
    '&:hover': {
      background: theme.palette.primary.dark,
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
    
  },[])
  return (
    <nav className={classes.root}>
      
      <List classes={{root: classes.flexCenter}} component="nav" aria-label="secondary mailbox folders">
      {['Characters','Movies'].map((resource, key)=>{
        let selected;
        if (resource === props.selectedResource) {
          selected = {classes: {root: classes.selectedItem}}
        }
        return (<ListItem {...selected} key={`${resource} ${key}`} onClick={()=>{props.selectResource(resource)}} button>
                  <ListItemText key={`${resource} ${key}`} classes={{root: classes.fontStyle}}  primary={resource} />
                </ListItem>)
      })}
       
        {/* <ListItemLink classes={{root: classes.flexCenter}}href="#simple-list">
          <ListItemText classes={{root: classes.flexCenter}} secondary="Spam" />
        </ListItemLink> */}
      </List>
    </nav>
  );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)



