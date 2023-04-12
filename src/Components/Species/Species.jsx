import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";

const Species = () => {

    const [species, setSpecies] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        axios.get('https://swapi.dev/api/species/')
        .then((response) => {
          
            setSpecies(response.data.results);
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
        <div className="category">
            <div className="title">
                {previousPage && <button onClick={previous}>{`<`}</button>}
                <h1>Species</h1>
                {nextPage && <button onClick={next}>{`>`}</button>}
            </div>
            <div className="category">
                <ul>
                    {species.map(specie => 
                    <li key={specie.url}><Link to={`/SpeciesDetails/${getId(specie.url, "species")}`}>{specie.name}</Link> </li>
                    )} 
                </ul>

            </div>
        </div>
        </>
    )
}

export default Species