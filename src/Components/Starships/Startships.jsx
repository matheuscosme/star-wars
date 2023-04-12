import React, { useState, useEffect } from "react";
import styles from "./Starships.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const Starships = () => {

    const [starships, setStarships] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/starships/')
        .then((response) => {
          
            setStarships(response.data.results);
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
            setStarships(response.data.results);
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
            setStarships(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        }).catch(() => {
          
        })
    }

    return (
        <>
        <div className={styles.starships}>
            <h1>Starships</h1>
            <div className={styles.starship}>
                <ul>
                    {starships.map(starship=> 
                    <li key={starship.url}><Link to={`/StarshipsDetails/${getId(starship.url, "starships")}`}>{starship.name}</Link> </li>
                    )} 
                </ul>
                {previousPage && <button onClick={previous}>{`<`} Previous</button>}
                {nextPage && <button onClick={next}>Next {`>`}</button>}
            </div>
        </div>
        </>
    )
}

export default Starships