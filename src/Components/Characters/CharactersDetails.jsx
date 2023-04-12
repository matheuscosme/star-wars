import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import { getContent } from "../../utils/getContent";
import { getHomeWorld } from "../../utils/getHomeworld";
import Loading from "../Loading/Loading";

const CharactersDetails = () => {

    const [person, setPerson] = useState([]);
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const [homeworld, setHomeWorld] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://swapi.dev/api/people/${id}`)
            .then(async (response) => {

                setPerson(response.data);

                await Promise.all([
                    getContent(response.data.films),
                    getContent(response.data.starships),
                    getContent(response.data.vehicles),
                    getContent(response.data.species),
                    getHomeWorld(response.data.homeworld)
                ]).then((values) => {
                    setFilms(values[0])
                    setStarships(values[1])
                    setVehicles(values[2])
                    setSpecies(values[3])
                    setHomeWorld(values[4])
                })
                setIsLoading(false);

            }).catch(() => {
                setIsLoading(true);
            })
    }, []);


    return (
        <>
            {isLoading && <Loading/>}
            <div className={"category"}>
                <h1>Character </h1>
                <h1>{person.name}</h1>
                <div className={"category"}>
                    <ul>
                        <li>Height: {person.height}</li>
                        <li>Mass: {person.mass}</li>
                        <li>Hair Color: {person.hair_color}</li>
                        <li>Eye Color: {person.eye_color}</li>
                        <li>Homeworld: {person.homeworld && <Link to={`/PlanetsDetails/${getId(person.homeworld, "planets")}`}>{homeworld}</Link>}</li>
                        <li>Films:
                            <ul>
                                {films.map(movie =>
                                    <li key={movie.url}><Link to={`/MoviesDetails/${getId(movie.url, "films")}`}>{movie.title}</Link></li>
                                )}
                            </ul>
                        </li>
                        <li>Vehicles:
                            <ul>
                                {vehicles.map(vehicle =>
                                    <li key={vehicle.url}><Link to={`/VehiclesDetails/${getId(vehicle.url, "vehicles")}`}>{vehicle.name}</Link></li>
                                )}
                            </ul>
                        </li>
                        <li>Starships:
                            <ul>
                                {starships.map(starship =>
                                    <li key={starship.url}><Link to={`/StarshipsDetails/${getId(starship.url, "starships")}`}>{starship.name}</Link></li>
                                )}
                            </ul>
                        </li>
                        <li>Species:
                            <ul>
                                {species.map(specie =>
                                    <li key={specie.url}><Link to={`/SpeciesDetails/${getId(specie.url, "species")}`}>{specie.name}</Link></li>
                                )}
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default CharactersDetails