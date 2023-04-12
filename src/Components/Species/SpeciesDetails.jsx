import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContent } from "../../utils/getContent";
import { getId } from "../../utils/getId";
import { getHomeWorld } from "../../utils/getHomeworld";
import Loading from "../Loading/Loading";

const SpeciesDetails = () => {

    const [specie, setSpecie] = useState([]);
    const [people, setPeople] = useState([]);
    const [films, setFilms] = useState([]);
    const [homeworld, setHomeWorld] = useState();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/species/${id}`)
        .then(async (response) => {
          
            setSpecie(response.data);
            console.log(getContent(response.data.people))
            await Promise.all([
                getContent(response.data.people),
                getContent(response.data.films),
                getHomeWorld(response.data.homeworld)
               
            ]).then((values) => {
                setPeople(values[0]);
                setFilms(values[1]);
                setHomeWorld(values[2])
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
            <h1>Specie</h1>
            <h1>{specie.name}</h1>
            <div className="category">
                <ul>
                   <li>Classification: {specie.classification}</li>
                   <li>Designation: {specie.designation}</li>
                   <li>Average Height: {specie.average_height}</li> 
                   <li>Skin Color: {specie.skin_colors}</li>
                   <li>Eye Colors: {specie.hair_colors}</li>
                   <li>Language: {specie.language}</li>
                   <li>Homeworld: {specie.homeworld && <Link to={`/PlanetsDetais/${getId(specie.homeworld, "planets")}`}>{homeworld}</Link>}</li>
                   <li>People:
                        <ul>
                            {people.map(person =>
                                <li key={person.url}><Link to={`/CharactersDetails/${getId(person.url,"people")}`}>{person.name}</Link></li>
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

export default SpeciesDetails