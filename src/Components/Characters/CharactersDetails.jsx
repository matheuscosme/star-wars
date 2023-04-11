import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const CharactersDetails = () => {

    const [person, setPerson] = useState([]);
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const [homeworld, setHomeWorld] = useState();
    const [homeworldUrl, setHomeWorldUrl] = useState();
    const { id } = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}`)
            .then(async (response) => {

                setPerson(response.data);
                getHomeWorld(response.data.homeworld);
                await Promise.all([
                    getList(response.data.films),
                    getList(response.data.starships),
                    getList(response.data.vehicles),
                    getList(response.data.species),
                ]).then((values) => {
                    setFilms(values[0])
                    setStarships(values[1])
                    setVehicles(values[2])
                    setSpecies(values[3])
                })

            }).catch(() => {
            })
    }, []);

    async function getList(urlList) {
        let list = [];
        for (let i = 0; i < urlList.length; i++) {
            await axios.get(`${urlList[i]}`)
                .then((response) => {
                    list.push(response.data);
                })
        }
        return list;
    }

    async function getHomeWorld(planetUrl) {
        await axios.get(`${planetUrl}`)
            .then((response) => {
                setHomeWorld(response.data.name);
                var idHomeWorld = getId(response.data.url, "planets");
                setHomeWorldUrl(idHomeWorld);
            })
    }


    return (
        <>
            <div className={styles.characters}>
                <h1>Character </h1>
                <h1>{person.name}</h1>
                <div className={styles.person}>
                    <ul>
                        <li>Height: {person.height}</li>
                        <li>Mass: {person.mass}</li>
                        <li>Hair Color: {person.hair_color}</li>
                        <li>Eye Color: {person.eye_color}</li>
                        <li>Homeworld: <Link to={`/PlanetsDetails/${homeworldUrl}`}>{homeworld}</Link></li>
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