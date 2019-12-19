import React ,{useState, useCallback}from 'react'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide';
import { Grid} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectResource } from '../../redux/actions/action-creators';


const useStyles = makeStyles(theme => ({
  root: {
    
    overflow: 'hidden',
    height: '100vh'
  }
}));



function ResponsiveLayout({Nav, Search, Scroll,Card}) {
    
  const classes= useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  function desktopLayout(isDesktop) {
    if (isDesktop)  {
      return ( <Grid container spacing={1}>
        <Grid item xs={2}>
              
                  <div style={{position: 'relative'}}>
                  <Nav />
                  </div>
             
        </Grid> 
        
        
        <Grid item xs={6}>
              <Grid item xs={12}>
                      <div style={{position: 'relative'}}>
                      <Search  toggleNavBar={toggleNavBar}/>
                      </div>
              </Grid>
              <Grid item xs={12}>
                      <div style={{position: 'relative'}}>
                      <Scroll/>
                      </div>
              </Grid>
              
        </Grid> 
        
        
        <Grid item xs={4}>  
          <div style={{position: 'relative', height: '100%', width:'100%'} }>
            <Card/>
          </div>
        
        </Grid>  
    </Grid>  )
    } else {
      return null
    }
  
  }
  function mobileLayout(isPhone) {
  
    if (isPhone) {
      return ( 
      <>
      <Search toggleNavBar={toggleNavBar}/>
      <Scroll toggleFeatures={toggleFeatures}/>
      <Slide direction="right" in={navBarState} timeout={100}>
                <div>
                  <Nav toggleNavBar={toggleNavBar}/>
                </div>
      </Slide> 
      <Slide direction="left" in={featuresState}>
                <div>
                  <Card toggleFeatures={toggleFeatures}/>
                </div>
      </Slide>      
            
       </>     
              
      
        
        
        
            
                  
           
            
                     
           
              
    
        
        
       
          
        
        
      
              
    
 )
    } else {
      return null
    }
    
  }
  const [navBarState, setNavBarState] = useState(false)
  const toggleNavBar=useCallback(()=>{
    if (featuresState) {
      return toggleFeatures()
    }
    if (!matches) {
      setNavBarState((navBarState)=>{
        return !navBarState
      })
    }
   
  })
  const [featuresState, setfeaturesState] = useState(false)
  const toggleFeatures=useCallback(()=>{
    if (navBarState) {
      return toggleNavBar()
    }
    if (!matches) {
      setfeaturesState((featuresState)=>{
        return !featuresState
      })
    }
   
  })

  return (
        <>
    <div className={classes.root}>
       {desktopLayout(matches)} 
       {mobileLayout(!matches)}    
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



