import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {

    const [persons, setPersons] = useState([]);
    const [quantity, setQuantity] = useState();


    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
        .then((response) => {
          
            setPersons(response.data.results);
            setQuantity((response.data.count));
         
        }).catch(() => {
          
        })

      }, []);

    function removeHttp(url){
        var id = url.split("https://swapi.dev/api/people/").toString();
        id = id.replace(/[,/]/g,'');
        return id
    }

    return (
        <>

        <div className={styles.characters}>
            <h1>Characters ({quantity}) </h1>
            <div className={styles.person}>
                <ul>
                    {persons.map(person => 
                    <li key={person.url}> {removeHttp(person.url)} - <Link to={`/CharacterDetails/${removeHttp(person.url)}`}>{person.name}</Link> </li>
                    )} 
                </ul>
            </div>
        </div>
        </>
    )
}

export default Characters