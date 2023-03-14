import React, { useState, useEffect } from "react";
import styles from "./Characters.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharactersDetails = () => {

    const [person, setPerson] = useState([]);
    // const [movieUrlList, setMovieUrlList] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}`)
        .then((response) => {
          
            setPerson(response.data);
            listarFilmes(response.data.films);
            console.log(movieList);
            // console.log(response.data);
         
        }).catch(() => {
        })
      }, []);

    async function listarFilmes(movieUrlList){
        var list = [];
        for(let i = 0;i<movieUrlList.length;i++){
            await axios.get(`${movieUrlList[i]}`)
            .then((response) =>{
                list.push(response.data.title);
            })
        }
        setMovieList(list);
    }


    return (
        <>
        {console.log(movieList)}
        <div className={styles.characters}>
            <h1>Character </h1>
            <h1>{person.name}</h1>
            <div className={styles.person}>
                <ul>
                   <li>Height: {person.height}</li>
                   <li>Mass: {person.mass}</li>
                   <li>Hair Color: {person.hair_color}</li> 
                   <li>Eye Color: {person.eye_color}</li>
                   <li>Films: 
                        <ul>
                            {movieList.map(movie =>
                                <li key={movie}> {movie}</li>
                                )}
                        </ul>
                    </li> 
                </ul>
                
            </div>
        </div>
        </>
    )
}

export default CharactersDetails