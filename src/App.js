import React from 'react';
import ResponsiveLayout from './components/hoc/ResponsiveLayout';
import PrimarySearchAppBar from './components/Header/index';
import ScrollList from './components/ScrollList/index'
import Nav from './components/NavList';
import Features from './components/Features';
import { createMuiTheme,ThemeProvider, withTheme } from '@material-ui/core/styles';
import { blue, red, yellow } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';
import { Hidden } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';
const theme = createMuiTheme({
  body: {
    backgroundImage: 'url("./img/stars-background.jpg")',
    padding: '4vh',
    position: 'relative',
   
    
  },
  layout: {
    borderRadius: 5,
    appHeight: '96vh' 
  },
  palette: {
    primary: {main: 'rgba(254, 220, 0, 1)', dark: 'rgba(205, 177, 0, 1)', darker: 'rgba(155, 134, 0, 1)'},
    secondary: {main: 'rgba(252, 0, 6, 1)'},
    tertiary: {main: 'rgba(0, 174, 100, 1)'},   
    background: {paper: 'rgba(158, 156, 156, 1)'},
    radialMetal: '-webkit-radial-gradient(  50%   0%,  8% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%)',
    opacity:  0.85
  } ,
  status: {
    danger: 'red',
  },
  typography: {
    fontFamily: ['Open Sans',
      'jediFont' 
    ].join(','),
    titles: [
      ['jediFont' 
    ].join(',')
    ]
  }
 
});



function App() {
  return (
    <> 
    <ThemeProvider theme={theme}>
        <ResponsiveLayout 
            Nav={Nav} 
            Search={PrimarySearchAppBar} 
            Scroll={ScrollList} 
            Card={Features}/>
      
    </ThemeProvider>
    </> 
    )
}

export default App;
