import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContent } from "../../utils/getContent";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const PlanetsDetails = () => {

    const [planet, setPlanet] = useState([]);
    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
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
            setIsLoading(false);

        }).catch(() => {
            setIsLoading(false);
        })
      }, []);


    return (
        <>
        {isLoading && <Loading/>}
        <div className="category">
            <h1>Planet</h1>
            <h1>{planet.name}</h1>
            <div className="category">
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