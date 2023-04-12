import React, { useState, useEffect } from "react";
import styles from "./Planets.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContent } from "../../utils/getContent";
import { getId } from "../../utils/getId";

const PlanetsDetails = () => {

    const [planet, setPlanet] = useState([]);
    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/planets/${id}`)
        .then(async (response) => {
          
            setPlanet(response.data);
            await Promise.all([
                getContent(response.data.residents),
                getContent(response.data.films)
            ]).then((values) => {
                setResidents(values[0]);
                setFilms(values[1])
            })

        }).catch(() => {
        })
      }, []);


    return (
        <>
        <div className={styles.planets}>
            <h1>Planet</h1>
            <h1>{planet.name}</h1>
            <div className={styles.planet}>
                <ul>
                   <li>Rotation Period: {planet.rotation_period}</li>
                   <li>Orbital Period: {planet.orbital_period}</li>
                   <li>Diameter: {planet.diameter}</li> 
                   <li>Climate: {planet.climate}</li>
                   <li>Gravity: {planet.gravity}</li>
                   <li>Terrain: {planet.terrain}</li>
                   <li>Population:{planet.population}</li>
                   <li>Residents:
                        <ul>
                            {residents.map(resident =>
                                <li key={resident.url}><Link to={`/CharactersDetails/${getId(resident.url,"people")}`}>{resident.name}</Link></li>
                                )}
                        </ul>
                    </li>
                   <li>Films:
                        <ul>
                            {films.map(movie =>
                                <li key={movie.url}><Link to={`/MoviesDetails/${getId(movie.url,"films")}`}>{movie.title}</Link></li>
                                )}
                        </ul>
                    </li>
                </ul>
                
            </div>
        </div>
        </>
    )
}

export default PlanetsDetails