import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://swapi.dev/api/vehicles/')
        .then((response) => {

            setVehicles(response.data.results);
            setNextPage(response.data.next);
            setIsLoading(false);
            
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
        {isLoading && <Loading/>}
        <div className="category">
            <div className="title">
                {previousPage && <button onClick={previous}>{`<`}</button>}
                <h1>Vehicles</h1>
                {nextPage && <button onClick={next}>{`>`}</button>}
            </div>
            <div className="category">
                <ul>
                    {vehicles.map((vehicle) => 
                    <li key={vehicle.url}><Link to={`/VehiclesDetails/${getId(vehicle.url, "vehicles")}`}>{vehicle.name}</Link> </li>
                    )} 
                </ul>
            </div>
        </div>
        </>
    )
}

export default Vehicles