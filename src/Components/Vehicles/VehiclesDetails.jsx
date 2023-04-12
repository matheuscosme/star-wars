import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getContent } from "../../utils/getContent";
import { getId } from "../../utils/getId";

const VehiclesDetails = () => {

    const [vehicle, setVehicle] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/vehicles/${id}`)
            .then(async (response) => {

                setVehicle(response.data);
                await Promise.all([
                    getContent(response.data.pilots),
                    getContent(response.data.films)
                ]).then((values) => {
                    setPilots(values[0]);
                    setFilms(values[1]);
                })

            }).catch(() => {
            })
    }, []);


    return (
        <>
            <div className={styles.vehicles}>
                <h1>Vehicle</h1>
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
                                    <li key={pilot.url}><Link to={`/CharactersDetails/${getId(pilot.url, "people")}`}>{pilot.name}</Link></li>
                                )}
                            </ul>
                        </li>
                        <li>Films:
                            <ul>
                                {films.map(movie =>
                                    <li key={movie.url}><Link to={`/MoviesDetails/${getId(movie.url, "films")}`}>{movie.title}</Link></li>
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