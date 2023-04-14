import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const Characters = () => {

    const [persons, setPersons] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/?page=1`)
            .then((response) => {
                setPersons(response.data.results);
                setNextPage(response.data.next);
                setIsLoading(false);

            }).catch(() => {
                setIsLoading(false);
                alert("Erro ao carregar dados")
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
            {isLoading && <Loading/>}
            <div className={"category"}>
                <div className={"title"}>
                    {previousPage ? <button onClick={previous}>{`<`}</button> : null}
                    <h1>Characters</h1>
                    {nextPage ? <button onClick={next}>{`>`}</button> : null}
                </div>
                <div className={"category"}>
                    <ul>
                        {persons.map(person =>
                            <li key={person.url}><Link to={`/CharactersDetails/${getId(person.url, "people")}`}>{person.name}</Link> </li>
                        )}
                    </ul>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Characters