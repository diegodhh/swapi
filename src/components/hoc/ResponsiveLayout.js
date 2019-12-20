import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide';
import { Grid} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';



const useStyles = makeStyles(theme => ({
  root: {
    
    overflow: 'hidden',
    height: '100vh'
  }
}));



function ResponsiveLayout({Nav, Header, Scroll,Features}) {
    
  const classes= useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  function desktopLayout(isDesktop) {
    if (isDesktop)  {
      return ( <Grid container spacing={1}>
        <Grid item xs={2}>
              
                  <div style={{position: 'relative'}}>
                  <Nav isPhone={!isDesktop} />
                  </div>
             
        </Grid> 
        
        
        <Grid item xs={6}>
              <Grid item xs={12}>
                      <div style={{position: 'relative'}}>
                      <Header isPhone={!isDesktop}  toggleNavBar={toggleNavBar}/>
                      </div>
              </Grid>
              <Grid item xs={12}>
                      <div style={{position: 'relative'}}>
                      <Scroll isPhone={!isDesktop}/>
                      </div>
              </Grid>
              
        </Grid> 
        
        
        <Grid item xs={4}>  
          <div style={{position: 'relative', height: '100%', width:'100%'} }>
            <Features isPhone={!isDesktop}/>
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
      <Header  isPhone={isPhone} toggleNavBar={toggleNavBar}/>
      <Scroll  isPhone={isPhone}  toggleFeatures={toggleFeatures}/>
      <Slide direction="right" in={navBarState} timeout={100}>
                <div >
                  <Nav  isPhone={isPhone}  toggleNavBar={toggleNavBar}/>
                </div>
      </Slide> 
      <Slide direction="left" in={featuresState}>
                <div>
                  <Features  isPhone={isPhone}  toggleFeatures={toggleFeatures}/>
                </div>
      </Slide>      
            
       </>     
              
      
        
        
        
            
                  
           
            
                     
           
              
    
        
        
       
          
        
        
      
              
    
 )
    } else {
      return null
    }
    
  }
  const [navBarState, setNavBarState] = useState(false)
  const toggleNavBar=()=>{
    if (featuresState) {
      return toggleFeatures()
    }
    if (!matches) {
      setNavBarState((navBarState)=>{
        return !navBarState
      })
    }
   
  }
  const [featuresState, setfeaturesState] = useState(false)
  const toggleFeatures=()=>{
    if (navBarState) {
      return toggleNavBar()
    }
    if (!matches) {
      setfeaturesState((featuresState)=>{
        return !featuresState
      })
    }
   
  }

  return (
        <>
    <div style={{position: 'relative'}} className={classes.root}>
       {desktopLayout(matches)} 
       {mobileLayout(!matches)}    
    </div>
      
   </>
    )
}

ResponsiveLayout.propTypes = {
  Nav: PropTypes.element,
  Header: PropTypes.element,
  Scroll: PropTypes.element,
  Features: PropTypes.element

}

export default ResponsiveLayout;



