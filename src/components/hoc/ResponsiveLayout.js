import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    
    overflow: 'hidden',
    height: '100vh'
  }
}));



function ResponsiveLayout({Nav, Search, Scroll,Card}) {
    
  const classes= useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  function desktopLayout(isDesktop) {
    if (isDesktop)  {
      return ( <Grid container spacing={1}>
        <Grid item xs={2}>
            
                  <Nav/>
              
        </Grid> 
        
        
        <Grid item xs={6}>
              <Grid item xs={12}>
                  <Search/>
              </Grid>
              <Grid item xs={12}>
                      <Scroll/>
              </Grid>
              
        </Grid> 
        
        
        <Grid item xs={4}>  
          <Card/>
        
        
        </Grid> 
              
    
  </Grid> )
    } else {
      return null
    }
  
  }
  function mobileLayout(isPhone) {
    if (isPhone) {
      return ( 
      <Grid container spacing={1}>
        <Nav/>
      <Search/>
            <Grid item xs={4}>
                
                <Scroll/>
            </Grid>
            <Grid item xs={8}>
              <Card/>
                
            </Grid>
            
            
              
      
        
        
        
            
                  
           
            
                     
           
              
    
        
        
       
          
        
        
      
              
    
  </Grid> )
    } else {
      return null
    }
    
  }


  return (
        <>
    <div className={classes.root}>
     <Grid container spacing={1}>
        <Grid item xs={2}>
            
                  <Nav/>
              
        </Grid> 
        
        
        <Grid item xs={6}>
              <Grid item xs={12}>
                      <Search/>
              </Grid>
              <Grid item xs={12}>
                      <Scroll/>
              </Grid>
              
        </Grid> 
        
        
        <Grid item xs={4}>  
          <Card/>
        
        
        </Grid>  
    </Grid>      
    </div>
      
   </>
    )
}

ResponsiveLayout.propTypes = {
  Nav: PropTypes.element,
  Search: PropTypes.element,
  Scroll: PropTypes.element,
  Card: PropTypes.element

}

export default ResponsiveLayout;



