import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const Planets = () => {

    const [planets, setPlanets] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://swapi.dev/api/planets/')
        .then((response) => {
          
            setPlanets(response.data.results);
            setNextPage(response.data.next);
            setIsLoading(false);
         
        }).catch(() => {
            setIsLoading(false);
        })

      }, []);

    async function previous(){
        if(previousPage == null){
            return;
        }
        await axios.get(`${previousPage}`)
        .then((response) => {
            setPlanets(response.data.results);
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
            setPlanets(response.data.results);
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
                <h1>Planets</h1>
                {nextPage && <button onClick={next}>{`>`}</button>}
            </div>
            <div className="category">
                <ul>
                    {planets.map(planet => 
                    <li key={planet.url}><Link to={`/PlanetsDetails/${getId(planet.url, "planets")}`}>{planet.name}</Link> </li>
                    )} 
                </ul>
            </div>
        </div>
        </>
    )
}

export default Planets