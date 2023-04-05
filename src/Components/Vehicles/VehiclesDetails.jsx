import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const VehiclesDetails = () => {

    const [vehicle, setVehicle] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/vehicles/${id}`)
        .then(async (response) => {
          
            setVehicle(response.data);
            setPilots(await getList(response.data.pilots));
            console.log(response.data.pilots);
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
        <div className={styles.vehicles}>
            <h1>Character </h1>
            <h1>{vehicle.name}</h1>
            <div className={styles.vehicle}>
                <ul>
                   <li>Model: {vehicle.model}</li>
                   <li>Manufacturer: {vehicle.manufacturer}</li>
                   <li>Cost: {vehicle.cost_in_credits}</li> 
                   <li>Length: {vehicle.length}</li>
                   <li>Max Speed: {vehicle.max_atmosphering_speed}</li>
                   <li>Crew: {vehicle.crew}</li>
                   <li>Passengers: {vehicle.passengers}</li>
                   <li>Cargo Capacity: {vehicle.cargo_capacity}</li>
                   <li>Class: {vehicle.vehicle_class}</li>
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

export default VehiclesDetails