import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getId } from "../../utils/getId";
import Loading from "../Loading/Loading";

const Movies = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://swapi.dev/api/films/')
            .then((response) => {
                setMovies(response.data.results);
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            })


    }, []);

    return (
        <>
            {isLoading && <Loading/>}
            <div className="category">
                <h1>Movies</h1>
                <div className="category">
                    <ul>
                        {movies.map(movie =>
                            <li key={movie.url}><Link to={`/MoviesDetails/${getId(movie.url,"films")}`}>{movie.title}</Link> </li>
                        )}
                    </ul>
                </div>
            </div>
        </>

    )
}

export default Movies