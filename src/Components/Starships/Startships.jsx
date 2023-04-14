import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const Starships = () => {

    const [starships, setStarships] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://swapi.dev/api/starships/')
        .then((response) => {
          
            setStarships(response.data.results);
            setNextPage(response.data.next);
            setIsLoading(false);
         
        }).catch(() => {
            setIsLoading(false);
          
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
        {isLoading && <Loading/>}
        <div className="category">
            <div className="title">
                {previousPage && <button onClick={previous}>{`<`}</button>}
                <h1>Starships</h1>
                {nextPage && <button onClick={next}>{`>`}</button>}
            </div>
            <div className="category">
                <ul>
                    {starships.map(starship=> 
                    <li key={starship.url}><Link to={`/StarshipsDetails/${getId(starship.url, "starships")}`}>{starship.name}</Link> </li>
                    )} 
                </ul>

            </div>
        </div>
        </>
    )
}

export default Starships