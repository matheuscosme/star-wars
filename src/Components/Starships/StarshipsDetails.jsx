import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContent } from "../../utils/getContent";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const StarshipsDetails = () => {

    const [starship, setStarship] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/starships/${id}`)
        .then(async (response) => {
          
            setStarship(response.data);
            await Promise.all([
                getContent(response.data.pilots),
                getContent(response.data.films)
            ]).then((values) => {
                setPilots(values[0]);
                setFilms(values[1]);
            })
            setIsLoading(false);

        }).catch(() => {
            setIsLoading(true);
        })
      }, []);

    
    return (
        <>
        {isLoading && <Loading/>}
        <div className="category">
            <h1>Character </h1>
            <h1>{starship.name}</h1>
            <div className="category">
                <ul>
                   <li>Model: {starship.model}</li>
                   <li>Manufacturer: {starship.manufacturer}</li>
                   <li>Cost: {starship.cost_in_credits}</li> 
                   <li>Length: {starship.length}</li>
                   <li>Max Speed: {starship.max_atmosphering_speed}</li>
                   <li>Crew: {starship.crew}</li>
                   <li>Passengers: {starship.passengers}</li>
                   <li>Cargo Capacity: {starship.cargo_capacity}</li>
                   <li>Class: {starship.starship_class}</li>
                   <li>Pilots: 
                        <ul>
                            {pilots.map(pilot =>
                                <li key={pilot.url}><Link to={`/CharactersDetails/${getId(pilot.url,"people")}`}>{pilot.name}</Link></li>
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

export default StarshipsDetails