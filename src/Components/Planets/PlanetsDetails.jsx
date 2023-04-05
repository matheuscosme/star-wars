import React, { useState, useEffect } from "react";
import styles from "./Planets.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PlanetsDetails = () => {

    const [planet, setPlanet] = useState([]);
    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/planets/${id}`)
        .then(async (response) => {
          
            setPlanet(response.data);
            setResidents(await getList(response.data.residents));
            setFilms(await getList(response.data.films));

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
                                <li key={resident.url}><Link to={`/CharactersDetails/${removeHttp(resident.url,"people")}`}>{resident.name}</Link></li>
                                )}
                        </ul>
                    </li>
                   <li>Films:
                        <ul>
                            {films.map(movie =>
                                <li key={movie.url}><Link to={`/MoviesDetails/${removeHttp(movie.url,"films")}`}>{movie.title}</Link></li>
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