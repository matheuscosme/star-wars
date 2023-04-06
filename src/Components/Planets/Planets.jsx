import React, { useState, useEffect } from "react";
import styles from "./Planets.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

    function removeHttp(url){
        var id = url.split("https://swapi.dev/api/planets/").toString();
        id = id.replace(/[,/]/g,'');
        return id
    }

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
                    <li key={planet.url}>{removeHttp(planet.url)} - <Link to={`/PlanetsDetails/${removeHttp(planet.url)}`}>{planet.name}</Link> </li>
                    )} 
                </ul>
                <button onClick={previous}>{`<`} Previous</button>
                <button onClick={next}>Next {`>`}</button>
            </div>
        </div>
        </>
    )
}

export default Planets