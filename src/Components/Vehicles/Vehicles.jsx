import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/vehicles/')
        .then((response) => {

            setVehicles(response.data.results);
            setNextPage(response.data.next);
            
        }).catch(() => {
          
        })

      }, []);

    async function previous(){
        if(previousPage == null){
            return;
        }
        await axios.get(`${previousPage}`)
        .then((response) => {
            setVehicles(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        }).catch(() => {
          
        })
    }

    async function next(){
        if(nextPage == null){
            return;
        }
        await axios.get(`${nextPage}`)
        .then((response) => {
            setVehicles(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        }).catch(() => {
          
        })
    }

    return (
        <>
        <div className={styles.vehicles}>
            <h1>Vehicles</h1>
            <div className={styles.vehicle}>
                <ul>
                    {vehicles.map((vehicle) => 
                    <li key={vehicle.url}><Link to={`/VehiclesDetails/${getId(vehicle.url, "vehicles")}`}>{vehicle.name}</Link> </li>
                    )} 
                </ul>
                {previousPage && <button onClick={previous}>{`<`} Previous</button>}
                {nextPage && <button onClick={next}>Next {`>`}</button>}
            </div>
        </div>
        </>
    )
}

export default Vehicles