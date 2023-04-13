import React from "react";
import styles from "./Home.module.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
        <div>
            <div className={styles.home}>
                {/* <h1>STAR WARS</h1> */}
                <div className={styles.logo}></div>
            </div>
            <div className={styles.grid}>
                <Link to="/characters" className={styles.link}><Card name="Characters" img="characters.webp"></Card></Link>
                <Link to="/movies" className={styles.link}><Card name="Movies" img="movies.avif"></Card></Link>
                <Link to="/vehicles" className={styles.link}><Card name="Vehicles" img="vehicles.webp"></Card></Link>
                <Link to="/starships" className={styles.link}><Card name="Starships" img="starships.jpg"></Card></Link>
                <Link to="/species" className={styles.link}><Card name="Species" img="species.jpg"></Card></Link>
                <Link to="/planets" className={styles.link}><Card name="Planets" img="planets.jpg"></Card></Link>
            </div>
        </div>
        </>
    )
}

export default Home