import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const Characters = () => {

    const [persons, setPersons] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?page=1`)
            .then((response) => {
                setPersons(response.data.results);
                setNextPage(response.data.next);
            }).catch(() => {

            })

    }, []);

    async function previous() {
        if (previousPage == null) {
            return;
        }
        await axios.get(`${previousPage}`)
            .then((response) => {
                setPersons(response.data.results);
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
            }).catch(() => {

            })
    }

    async function next() {
        if (nextPage == null) {
            return;
        }
        await axios.get(`${nextPage}`)
            .then((response) => {
                setPersons(response.data.results);
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
            }).catch(() => {

            })
    }

    return (
        <>

            <div className={styles.characters}>
                <h1>Characters</h1>
                <div className={styles.person}>
                    <ul>
                        {persons.map(person =>
                            <li key={person.url}><Link to={`/CharactersDetails/${getId(person.url, "people")}`}>{person.name}</Link> </li>
                        )}
                    </ul>
                    {previousPage ? <button onClick={previous}>{`<`} Previous</button> : null}
                    {nextPage ? <button onClick={next}>Next {`>`}</button> : null}
                </div>
            </div>
        </>
    )
}

export default Characters