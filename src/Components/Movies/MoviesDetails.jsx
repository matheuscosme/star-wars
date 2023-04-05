import React, { useState, useEffect } from "react";
import styles from "./Movies.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MoviesDetails = () => {

    const [film, setFilm] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/films/${id}`)
        .then(async (response) => {
          
            setFilm(response.data);
            setCharacters(await getList(response.data.characters));
            setPlanets(await getList(response.data.planets));
            setStarships(await getList(response.data.starships));
            setVehicles(await getList(response.data.vehicles));
            setSpecies(await getList(response.data.species));
         
        }).catch(() => {
        })
      }, []);

    async function getList(urlList){
        let list = [];
        for(let i = 0;i<urlList.length;i++){
            await axios.get(`${urlList[i]}`)
            .then((response) =>{
                list.push(response.data);
            })
        }
        return list;
    }

    function removeHttp(url, type){
        var id = url.split(`https://swapi.dev/api/${type}/`).toString();
        id = id.replace(/[,/]/g,'');
        return id
    }


    return (
        <>
        <div className={styles.movies_details}>
            <h1>Film </h1>
            <h1>{film.title}</h1>
            <div className={styles.film}>
                <ul>
                    <li>Director: {film.director}</li>
                    <li>Producer: {film.producer}</li>
                    <li>Release Date: {film.release_date}</li> 
                    <li>Episode: {film.episode_id}</li>
                   <li>Characters: 
                        <ul>
                            {characters.map(character =>
                                <li key={character.url}><Link to={`/CharactersDetails/${removeHttp(character.url,"characters")}`}>{character.name}</Link></li>
                                )}
                        </ul>
                    </li>
                    <li>Planets: 
                        <ul>
                            {planets.map(planet =>
                                <li key={planet.url}><Link to={`/PlanetsDetails/${removeHttp(planet.url,"planets")}`}>{planet.name}</Link></li>
                                )}
                        </ul>
                    </li>
                    <li>Starships: 
                        <ul>
                            {starships.map(starship =>
                                <li key={starship.url}><Link to={`/StarshipsDetails/${removeHttp(starship.url,"starships")}`}>{starship.name}</Link></li>
                                )}
                        </ul>
                    </li>
                    <li>Vehicles: 
                        <ul>
                            {vehicles.map(vehicle =>
                                <li key={vehicle.url}><Link to={`/VehiclesDetails/${removeHttp(vehicle.url,"vehicles")}`}>{vehicle.name}</Link></li>
                                )}
                        </ul>
                    </li>
                    <li>Species: 
                        <ul>
                            {species.map(specie =>
                                <li key={specie.url}><Link to={`/SpeciesDetails/${removeHttp(specie.url,"species")}`}>{specie.name}</Link></li>
                                )}
                        </ul>
                    </li>
                </ul>
                
            </div>
        </div>
        </>
    )
}

export default MoviesDetails