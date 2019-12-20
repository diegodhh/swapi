import React, {useEffect, useState} from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as actionCreators  from '../../redux/actions/action-creators';
import {connect} from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Characters, Movies, Starships, Vehicles,Species,Planets} from './../../redux/reducers/Models/Resources';
import IconButton from '@material-ui/core/IconButton';
import coverImg from './../../img/covers/vertical-cover2.jpg';

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
    opacity: 1,
    height: '100vh',
    
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
      zIndex: 1000 ,
      width: '80%',
      opacity: 1
      
      
    },['&::before'] : {
     
      backgroundColor: theme.palette.background.defaultTranslucide,
      content: '""',
      width: '100%',
      height: '100%',
      
      zIndex: -200,
      top: 0,
      left: 0,
      position: 'absolute',
     
      borderRadius: theme.layout.borderRadius,
    }
    
    ,['&::after'] : {
     
      backgroundImage: `url(${coverImg})`, 
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      content: '""',
      width: '100%',
      height: '100%',
      zIndex: -700,
      filter: 'grayscale(20%) sepia(20%) brightness(0.4)',
      top: 0,
      left: 0,
      position: 'absolute',
     
      borderRadius: theme.layout.borderRadius,
    }

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
  },
    moreIcon: {
      display: 'flex',
      alignSelf: 'center'
      
  }
}));



function Nav(props) {
  const [moreResourcesState, setMoreResources] = useState(false)
  const toggleMoreResources = ()=>{
    setMoreResources((prevState) => !prevState)
    return props.toggleNavBar? props.toggleNavBar(): null 
  }
  const classes = useStyles();
  useEffect(() => {
      
    props.selectResource('Characters')
    
  },[])
  let resourcesArray;
  if (!moreResourcesState) {
    resourcesArray = [Characters, Movies]
  } else {
    resourcesArray = [Characters, Movies,Starships,Vehicles,Species,Planets]
  }



  return (
    <nav onClick={props.toggleNavBar}  className={classes.root}>
      
      <List  classes={{root: classes.flexCenter}} component="nav" aria-label="secondary mailbox folders">
      {resourcesArray.map((Resource, key)=>{
                  let selected;
                  const resource = new Resource();
                  const {resourceName,displayName }=resource.state
                  if (resourceName === props.selectedResource) {
                    selected = {classes: {root: classes.selectedItem}}
                  }
                  return (<ListItem {...selected} key={`${resourceName} ${key}`} onClick={()=>{props.selectResource(resourceName)}} button>
                            <ListItemText key={`${resourceName} ${key}`} classes={{root: classes.fontStyle}}  primary={displayName} />
                          </ListItem>)
      })}
       
     
      </List>
      <IconButton
            onClick={toggleMoreResources}
            edge="start"
            className={classes.moreIcon}
            color="inherit"
            aria-label="open drawer"
          >
            { moreResourcesState &&
              <ExpandLessIcon />
            }
            { 
             !moreResourcesState &&
              <ExpandMoreIcon />
            }
            
      </IconButton>
    </nav>
  );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)



