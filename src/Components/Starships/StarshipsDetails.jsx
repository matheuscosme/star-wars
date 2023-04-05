import React, { useState, useEffect } from "react";
import styles from "./Starships.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const StarshipsDetails = () => {

    const [starship, setStarship] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/starships/${id}`)
        .then(async (response) => {
          
            setStarship(response.data);
            setPilots(await getList(response.data.pilots));
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
        <div className={styles.starships}>
            <h1>Character </h1>
            <h1>{starship.name}</h1>
            <div className={styles.starship}>
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
                                <li key={pilot.url}><Link to={`/CharactersDetails/${removeHttp(pilot.url,"people")}`}>{pilot.name}</Link></li>
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

export default StarshipsDetails