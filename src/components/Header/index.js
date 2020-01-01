import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';

import SearchIcon from '@material-ui/icons/Search';

import MenuIcon from '@material-ui/icons/Menu';

import {connect} from 'react-redux';
import * as actionCreators  from '../../redux/actions/action-creators';
import { red } from '@material-ui/core/colors';

const mapStateToProps = state => ({ searchField: state.data.current.searchField,
  resource: state.data.selectedResource, displayName: state.data.current.displayName })

  const mapDispatchToProps = dispatch => {
    return {
      searchItem: actionCreators.searchItem,
    }
  }
const useStyles = makeStyles(theme => ({
  appBar:{
   
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.layout.borderRadius,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '0px' , 
      left: '0px' ,
      zIndex: 1000 ,
      width: '100%'}
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.titles,
    color: theme.palette.primary.main,
    fontWeight: 600,
  
    flexGrow: 1,
    flexShrink: 0,
    paddingRight: theme.spacing(2),  
      
     
      [theme.breakpoints.down('md')]: {
        
        
        
      },
      [theme.breakpoints.down('sm')]: {
    
       
       
      },
      [theme.breakpoints.down('xs')]: {
     
       
        fontSize: '18px',
     
      },

    
  },
  search: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: -5,
    marginRight: theme.spacing(2),
    flexGrow: 5,
    flexShrink: 1,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
     
      flexShrink: 1
    },
    [theme.breakpoints.down('md')]: {
     
      flexShrink: 1
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      // width: '256%',
      
      maxWidth: '700px'
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0)
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  inputRoot: {
    color: 'inherit',
    position: "relative",
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 7),
    position: "relative",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
     
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function SearchHeader(props) {
  const classes = useStyles();
  const [IsOnFocus, setIsOnFocus] = useState(false)
  console.log(IsOnFocus)
  return (
    <div className={classes.grow}>
      <AppBar  classes={{root: classes.appBar}} position="static">
        <Toolbar>
         
        <div className={classes.sectionMobile}>
          <IconButton
            onClick={props.toggleNavBar}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
           
          </div>
          {((!IsOnFocus && !props.searchField) || !props.isPhone) &&
          <Typography className={classes.title} variant="h6" noWrap>
              {props.displayName}
          </Typography> 
            }
         
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase onFocus={()=>setIsOnFocus(true)} onBlur={()=>setIsOnFocus(false)} onChange={(e)=>props.searchItem(e.target.value) } value={props.searchField}
              placeholder="Buscar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            
           {props.searchField && <div onClick={()=>props.searchItem('')} style={{display: 'flex', paddingRight: '5px'}}>
              <CloseIcon style={{opacity: 0.45}}/>
            </div>}
            
          </div>
          
          <div className={classes.grow} />
         
         
        </Toolbar>
      </AppBar>
     
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader)