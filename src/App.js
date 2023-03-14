import './App.css';
import React from 'react';
import Characters from './Components/Characters/Characters'
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Starships from './Components/Starships/Startships';
import Vehicles from './Components/Vehicles/Vehicles';
import Species from './Components/Species/Species';
import Planets from './Components/Planets/Planets';
import CharactersDetails from './Components/Characters/CharactersDetails';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/characters' element={<Characters/>}> </Route>
        <Route path='/movies' element={<Movies/>}> </Route>
        <Route path='/starships' element={<Starships/>}> </Route>
        <Route path='/vehicles' element={<Vehicles/>}> </Route>
        <Route path='/species' element={<Species/>}> </Route>
        <Route path='/planets' element={<Planets/>}> </Route>
        <Route path="/CharacterDetails/:id" element={<CharactersDetails/>}></Route>
      </Routes>
    </Router>
    </>

  )
}

export default App;
