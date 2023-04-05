import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/vehicles/')
        .then((response) => {
          
            console.log(response.data.results);
            setVehicles(response.data.results);
            setNextPage(response.data.next);
         
        }).catch(() => {
          
        })

      }, []);

    function removeHttp(url){
        var id = url.split("https://swapi.dev/api/vehicles/").toString();
        id = id.replace(/[,/]/g,'');
        return id
    }

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
                    {vehicles.map(vehicle => 
                    <li key={vehicle.url}>{removeHttp(vehicle.url)} - <Link to={`/VehiclesDetails/${removeHttp(vehicle.url)}`}>{vehicle.name}</Link> </li>
                    )} 
                </ul>
                <button onClick={previous}>{`<`} Previous</button>
                <button onClick={next}>Next {`>`}</button>
            </div>
        </div>
        </>
    )
}

export default Vehicles