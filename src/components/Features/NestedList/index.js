import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import robotIcon from './../../../img/index.png'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {translateColor} from './../../../util/colorTranslator'
import CircularIndeterminate from './../../spiner';


// this function create layout acording the type of the schema, array or string... 
const schemaLoader= (schema, itemCallback,listCallback) =>{
  const printSchema = [];

  let index = 0;
  for (const property in schema) {
    
    if (schema[property].type !== Array) {
      printSchema.push(itemCallback(property, schema[property], index))
    }
    if (schema[property].type === Array) {
      
      let aux =listCallback(property,schema[property], index);
      
      if (!aux) {
        printSchema.push((<CircularIndeterminate/>))
       
      }
      printSchema.push(aux)
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

export default function NestedList({schema,item, select}) {
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
      {/* this function is maping the layout acording the schema */}
      {
        schemaLoader(schema, 
              (key, obj, index)=>{
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
                    <img src={robotIcon}/>
              
                  </ListItemIcon>
                  
                  <ListItemText classes={{root: classes.featuresItemText}} primary={item?obj.displayName: 'loading'} />
                  <ListItemText classes={{root: classes.featuresItemProperty}} primary={item?item[key]: 'loading'} />
              </ListItem> )
              }
                }
        ,
              (key,obj, index)=>{
                        if ( item[key] && item[key].length === 0) {
                          return []
                        }
                        const firstKey = item[key] && item[key][0]?Object.keys(item[key][0])[0]:null
                        if (!firstKey || typeof(item[key][0]) === 'string' ) {
                          return false
                        }
                        return(
                        <> 
                        <ListItem button onClick={handleClick}>
                          <ListItemIcon classes={{root:classes.iconParent}}>
                            <img src={robotIcon}/>
                          </ListItemIcon>
                          <ListItemText primary={obj.displayName} />
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {!item ? null: item[key].map((subItem, index)=>{
                  if (typeof(subItem) === 'string' || !firstKey) {
                    return false
                  } 
                  return (<> <Collapse in={open} timeout="auto" unmountOnExit>
                  <List key={subItem[firstKey]  + index} component="div" disablePadding>
                    <ListItem onClick={()=>select({str: subItem[firstKey], resource: obj.resource})}button className={classes.nested}>
                      <ListItemIcon classes={{root:classes.iconParent}}>
                        <img src={robotIcon}/>
                        {/* <StarBorder /> */}
                      </ListItemIcon>
                      <ListItemText primary={subItem[firstKey] ||subItem.msg} />
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
