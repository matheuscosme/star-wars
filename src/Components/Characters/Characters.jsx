import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {

    const [persons, setPersons] = useState([]);
    const [quantity, setQuantity] = useState();
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?page=1`)
        .then((response) => {
            setPersons(response.data.results);
            setQuantity((response.data.count));
            setNextPage(response.data.next);
        }).catch(() => {
          
        })

      }, []);

    function removeHttp(url){
        var id = url.split("https://swapi.dev/api/people/").toString();
        id = id.replace(/[,/]/g,'');
        return id
    }

    async function previous(){
        if(previousPage == null){
            return;
        }
        await axios.get(`${previousPage}`)
        .then((response) => {
            setPersons(response.data.results);
            setQuantity((response.data.count));
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
            setPersons(response.data.results);
            setQuantity((response.data.count));
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
        }).catch(() => {
          
        })
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
                <button onClick={previous}>{`<`} Previous</button>
                <button onClick={next}>Next {`>`}</button>
            </div>
        </div>
        </>
    )
}

export default Characters