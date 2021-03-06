import React from 'react';
import ResponsiveLayout from './components/hoc/ResponsiveLayout';
import SearchHeader from './components/Header/index';
import ScrollList from './components/ScrollList/index'
import Nav from './components/NavList';
import Features from './components/Features';
import { createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import {Helmet} from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const theme = createMuiTheme({
  'body': {
    background: 'red',
   
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
    background: {defaultTranslucide:'rgba(158, 156, 156, 0.8)',
                               default: 'rgba(158, 156, 156, 1)',
  
  paper: 'transparent'},

    backgroundColor: {paper: 'rgba(158, 156, 156, 0.7)'},
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
    <Helmet>
    <link rel="icon" href="./index.png" /> 
                <meta charSet="utf-8" />
                <title>Swapi</title>
                <link rel="canonical" href="http://mysite.com/example" />
  </Helmet> 
    <ThemeProvider theme={theme}>
    <Router>
        <Route path='/'>
        <ResponsiveLayout 
            Nav={Nav} 
            Header={SearchHeader} 
            Scroll={ScrollList} 
            Features={Features}/>
      </Route>
    </Router>
    
    </ThemeProvider>
    </> 
    )
}

export default App;
