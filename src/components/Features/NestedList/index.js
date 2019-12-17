import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CircularIndeterminate from './../../spiner';


const schemaLoader= (schema, itemCallback,listCallback) =>{
  const printSchema = [];
  let index = 0;
  for (const property in schema) {
    
    if (schema[property] !== Array) {
      printSchema.push(itemCallback(property, index))
    }
    if (schema[property] === Array) {
      printSchema.push(listCallback(property, index))
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
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconParent: {
    '& > img': {
      width: 24,
      height: 24
    }
}
}));

export default function NestedList({schema,item,icon, select}) {
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
        <ListSubheader component="div" id="nested-list-subheader">
          description 
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        schemaLoader(schema, (key, index)=>{
          if (index === 0) {
            return null
          } else {
            return ( <ListItem button>
        
              <ListItemIcon classes={{root:classes.iconParent}}>
              <img src={icon}/>
         <div> {key} </div>
            </ListItemIcon> 
            <ListItemText primary={item?item[key]: 'loading'} />
         </ListItem> )
        }
          }
        ,
        (key, index)=>{
                  
                  return(
                  <> 
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon classes={{root:classes.iconParent}}>
                      <img src={icon}/>
                    </ListItemIcon>
                    <ListItemText primary={key} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  {!item? null: item[key].map((subItem, index)=>{
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
