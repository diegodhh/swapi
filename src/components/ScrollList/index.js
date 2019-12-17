import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {connect} from 'react-redux'
import * as actionCreators  from '../../redux/actions/action-creators';

const mapStateToProps = state => ({ currentList: state.data.current.displayList })

  const mapDispatchToProps = dispatch => {
    return {
      selectItem: actionCreators.selectItem,
      fetchMore: actionCreators.fetchMore
    }
  }


const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10px',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '90vh'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

function ScrollList(props) {
  

   
  
  
  const classes = useStyles();
  const tag = props.currentList.length? Object.keys(props.currentList[0])[0] : 'Loading'; 
 
  
  return (


    <List  className={classes.root} subheader={<li />}>
      {[tag].map(sectionId => (
        <li  key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`${sectionId}`}</ListSubheader>
            {props.currentList.map((item, index) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText onClick={()=>{props.selectItem(index)}} primary={item[Object.keys(item)[0]]} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollList)

