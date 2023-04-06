import React, { useState, useEffect } from "react";
import styles from "./Movies.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        axios.get('https://swapi.dev/api/films/')
            .then((response) => {
                setMovies(response.data.results);
            }).catch(() => {

            })

    }, []);

    function removeHttp(url) {
        var id = url.split("https://swapi.dev/api/films/").toString();
        id = id.replace(/[,/]/g, '');
        return id
    }

    return (
        <>
            <div className={styles.movies}>
                <h1>Movies</h1>
                <div className={styles.film}>
                    <ul>
                        {movies.map(movie =>
                            <li key={movie.url}> {removeHttp(movie.url)} - <Link to={`/MoviesDetails/${removeHttp(movie.url)}`}>{movie.title}</Link> </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Movies