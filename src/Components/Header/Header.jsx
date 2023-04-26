import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className={styles.header}>

                <nav className={styles.nav}>

                    <ul className={styles.menu}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/characters">Characters</NavLink></li>
                        <li><NavLink to="/movies">Movies</NavLink></li>
                        <li><NavLink to="/vehicles">Vehicles </NavLink></li>
                        <li><NavLink to="/starships">Starships</NavLink></li>
                        <li><NavLink to="/species">Species </NavLink></li>
                        <li><NavLink to="/planets">Planets </NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header