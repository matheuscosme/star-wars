import React, { useState, useEffect } from "react";
import styles from "./Species.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Species = () => {

    const [species, setSpecies] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/species/')
        .then((response) => {
          
            console.log(response.data.results);
            setSpecies(response.data.results);
            setNextPage(response.data.next);
         
        }).catch(() => {
          
        })

      }, []);

    function removeHttp(url){
        var id = url.split("https://swapi.dev/api/species/").toString();
        id = id.replace(/[,/]/g,'');
        return id
    }

    async function previous(){
        if(previousPage == null){
            return;
        }
        await axios.get(`${previousPage}`)
        .then((response) => {
            setSpecies(response.data.results);
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
            setSpecies(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        }).catch(() => {
          
        })
    }

    return (
        <>
        <div className={styles.species}>
            <h1>Species</h1>
            <div className={styles.specie}>
                <ul>
                    {species.map(specie => 
                    <li key={specie.url}>{removeHttp(specie.url)} - <Link to={`/SpeciesDetails/${removeHttp(specie.url)}`}>{specie.name}</Link> </li>
                    )} 
                </ul>
                <button onClick={previous}>{`<`} Previous</button>
                <button onClick={next}>Next {`>`}</button>
            </div>
        </div>
        </>
    )
}

export default Species