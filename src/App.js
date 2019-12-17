import React from 'react';
import ResponsiveLayout from './components/hoc/ResponsiveLayout';
import PrimarySearchAppBar from './components/Header/index';
import ScrollList from './components/ScrollList/index'
import Nav from './components/NavList';
import Features from './components/Features';



function App() {
  return (
    <> 
   
     <ResponsiveLayout 
        Nav={Nav} 
        Search={PrimarySearchAppBar} 
        Scroll={ScrollList} 
        Card={Features}/>
     </>
    )
}

export default App;
