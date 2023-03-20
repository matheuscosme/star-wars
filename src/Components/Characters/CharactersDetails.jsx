import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CharactersDetails = () => {

    const [person, setPerson] = useState([]);
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const [homeworld, setHomeWorld] = useState();
    const [homeworldUrl, setHomeWorldUrl] = useState();
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}`)
        .then(async (response) => {
          
            setPerson(response.data);
            setFilms(await getList(response.data.films));
            setStarships(await getList(response.data.starships));
            setVehicles(await getList(response.data.vehicles));
            setSpecies(await getList(response.data.species));
            getHomeWorld(response.data.homeworld);

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

    async function getHomeWorld(planetUrl){
        await axios.get(`${planetUrl}`)
        .then((response) =>{
            setHomeWorld(response.data.name);
            var idHomeWorld = removeHttp(response.data.url, "planets");
            setHomeWorldUrl(idHomeWorld);
        })
    }

    function removeHttp(url, type){
        var id = url.split(`https://swapi.dev/api/${type}/`).toString();
        id = id.replace(/[,/]/g,'');
        return id
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
                   <li>Homeworld: <Link to={`/PlanetsDetais/${homeworldUrl}`}>{homeworld}</Link></li>
                   <li>Films: 
                        <ul>
                            {films.map(movie =>
                                <li key={movie.url}><Link to={`/MoviesDetails/${removeHttp(movie.url,"films")}`}>{movie.title}</Link></li>
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
                    <li>Starships: 
                        <ul>
                            {starships.map(starship =>
                                <li key={starship.url}><Link to={`/StarshipsDetails/${removeHttp(starship.url,"starships")}`}>{starship.name}</Link></li>
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

export default CharactersDetails