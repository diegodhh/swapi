import React from 'react';
import ResponsiveLayout from './components/hoc/ResponsiveLayout';
import PrimarySearchAppBar from './components/Header/index';
import ScrollList from './components/ScrollList/index'
import NavList from './components/NavList';
import Character from './components/Character';
import './App.css';

function App() {
  return (
    <> 
   
     <ResponsiveLayout Nav={NavList} Search={PrimarySearchAppBar} Scroll={ScrollList} Card={Character}/>
     </>
    )
}

export default App;
