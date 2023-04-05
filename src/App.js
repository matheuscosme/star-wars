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
import MoviesDetails from './Components/Movies/MoviesDetails';
import VehiclesDetails from './Components/Vehicles/VehiclesDetails';
import StarshipsDetails from './Components/Starships/StarshipsDetails';
import SpeciesDetails from './Components/Species/SpeciesDetails';
import PlanetsDetails from './Components/Planets/PlanetsDetails';

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
        <Route path="/CharactersDetails/:id" element={<CharactersDetails/>}></Route>
        <Route path="/MoviesDetails/:id" element={<MoviesDetails/>}></Route>
        <Route path="/VehiclesDetails/:id" element={<VehiclesDetails/>}></Route>
        <Route path="/StarshipsDetails/:id" element={<StarshipsDetails/>}></Route>
        <Route path="/SpeciesDetails/:id" element={<SpeciesDetails/>}></Route>
        <Route path="/PlanetsDetails/:id" element={<PlanetsDetails/>}></Route>
      </Routes>
    </Router>
    </>

  )
}

export default App;
