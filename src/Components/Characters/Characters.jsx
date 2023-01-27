import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";

const Characters = () => {

    const [person, setPerson] = useState([]);

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/1/')
        .then((response) => {
          
            console.log(response.data)
            setPerson((response.data));
         
        }).catch(() => {
          
        })

      }, []);

    return (
        <>
        <div className={styles.characters}>
            <h1>Personagem: {person.name}</h1>
        </div>
        </>
    )
}

export default Characters