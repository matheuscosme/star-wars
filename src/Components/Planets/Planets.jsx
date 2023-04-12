import React, { useState, useEffect } from "react";
import styles from "./Planets.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const Planets = () => {

    const [planets, setPlanets] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/planets/')
        .then((response) => {
          
            setPlanets(response.data.results);
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
        <div className={styles.planets}>
            <h1>Planets</h1>
            <div className={styles.planet}>
                <ul>
                    {planets.map(planet => 
                    <li key={planet.url}><Link to={`/PlanetsDetails/${getId(planet.url, "planets")}`}>{planet.name}</Link> </li>
                    )} 
                </ul>
                {previousPage && <button onClick={previous}>{`<`} Previous</button>}
                {nextPage && <button onClick={next}>Next {`>`}</button>}
            </div>
        </div>
        </>
    )
}

export default Planets