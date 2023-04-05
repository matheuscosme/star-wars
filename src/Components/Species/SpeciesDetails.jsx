import React, { useState, useEffect } from "react";
import styles from "./Species.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SpeciesDetails = () => {

    const [specie, setSpecie] = useState([]);
    const [people, setPeople] = useState([]);
    const [films, setFilms] = useState([]);
    const [homeworld, setHomeWorld] = useState();
    const [homeworldUrl, setHomeWorldUrl] = useState();
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/species/${id}`)
        .then(async (response) => {
          
            setSpecie(response.data);
            setPeople(await getList(response.data.people));
            setFilms(await getList(response.data.films));
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
        <div className={styles.species}>
            <h1>Specie</h1>
            <h1>{specie.name}</h1>
            <div className={styles.specie}>
                <ul>
                   <li>Classification: {specie.classification}</li>
                   <li>Designation: {specie.designation}</li>
                   <li>Average Height: {specie.average_height}</li> 
                   <li>Skin Color: {specie.skin_colors}</li>
                   <li>Eye Colors: {specie.hair_colors}</li>
                   <li>Language: {specie.language}</li>
                   <li>Homeworld: <Link to={`/PlanetsDetais/${homeworldUrl}`}>{homeworld}</Link></li>
                   <li>People:
                        <ul>
                            {people.map(person =>
                                <li key={person.url}><Link to={`/CharactersDetails/${removeHttp(person.url,"people")}`}>{person.name}</Link></li>
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

export default SpeciesDetails