import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";

const Characters = () => {

    const [persons, setPersons] = useState([]);
    const [quantity, setQuantity] = useState();


    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
        .then((response) => {
          
            console.log(response.data.results);
            setPersons(response.data.results);
            setQuantity((response.data.count));
         
        }).catch(() => {
          
        })

      }, []);

    return (
        <>

        <div className={styles.characters}>
            <h1>Total de Personagens: {quantity}</h1>
            <h1>Listagem: </h1>
            <ul>
                {persons.map(person => 
                <li key={person.url}>{person.name}</li>
                )}
            </ul>
        </div>
        </>
    )
}

export default Characters