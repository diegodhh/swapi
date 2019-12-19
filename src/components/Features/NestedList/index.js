import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {translateColor} from './../../../util/colorTranslator'
import CircularIndeterminate from './../../spiner';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const schemaLoader= (schema, itemCallback,listCallback) =>{
  const printSchema = [];

  let index = 0;
  for (const property in schema) {
    
    if (schema[property].type !== Array) {
      printSchema.push(itemCallback(property, schema[property], index))
    }
    if (schema[property].type === Array) {
      printSchema.push(listCallback(property,schema[property], index))
    }
    index++ 
  }
  return printSchema;
}
const useStyles = makeStyles(theme => ({
  
  root: {
    
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    textTransform: "uppercase",
    fontWeight: 800,
    color: ' white'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconParent: {
    flex: '1 0 0',
    '& > img': {
      
      width: 24,
      height: 24
    }},
    featuresItem:{
      
      display: 'flex',
      justifyContent: 'space-around',
      '& > *': {
        
        flex: '0 0 0'
      }
    
  
    },featuresItemText:{
      textTransform: "uppercase",
      
      
      flex: '1 0 0'  
    },featuresItemProperty:{
      textTransform: "uppercase",
      fontWeight: 800,
      color: 'white',
      flex: '1 0 0' 
    },
    subheader:{
      fontWeight: '700',
    
    }
  }));

export default function NestedList({schema,item,icon, select}) {
  if (item && item['eye_color']) {
    item['eye_color'] = translateColor(item['eye_color']);
  }
  if (item && item['eye_colors']) {
    item['eye_colors'] = translateColor(item['eye_colors']);
  }
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader classes={{root:classes.subheader}}component="div" id="nested-list-subheader">
          descripción
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        schemaLoader(schema, (key, obj, index)=>{
          if (index === 0) {
            return null
          } else {
            if (item) {
              if (item[key] === 'unknown') {
                item[key] = 'desconocido'
              }  
            }
            return ( 
            <ListItem classes={{root: classes.featuresItem}}>
        
              <ListItemIcon classes={{root:classes.iconParent}}>
              <img src={icon}/>
         
            </ListItemIcon>
            
            <ListItemText classes={{root: classes.featuresItemText}} primary={item?obj.displayName: 'loading'} />
            <ListItemText classes={{root: classes.featuresItemProperty}} primary={item?item[key]: 'loading'} />
         </ListItem> )
        }
          }
        ,
        (key,obj, index)=>{
                  
                  return(
                  <> 
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon classes={{root:classes.iconParent}}>
                      <img src={icon}/>
                    </ListItemIcon>
                    <ListItemText primary={obj.displayName} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  {!item? null: item[key].map((subItem, obj, index)=>{
            if (typeof(subItem) === 'string') {
              return (<CircularIndeterminate/>)
            } 
            return (<> <Collapse in={open} timeout="auto" unmountOnExit>
            <List key={subItem.name + subItem.director + index} component="div" disablePadding>
              <ListItem onClick={()=>select(subItem.title)}button className={classes.nested}>
                <ListItemIcon classes={{root:classes.iconParent}}>
                  <img src={icon}/>
                  {/* <StarBorder /> */}
                </ListItemIcon>
                <ListItemText primary={subItem.title || subItem.msg} />
              </ListItem>
            </List>
          </Collapse>
          </>) 
            
          })
         
        }
                </>)
        })
     
      }
      
     
      
    </List>
  );
}
