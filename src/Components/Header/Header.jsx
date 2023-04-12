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
                        <NavLink to="/vehicles">Vehicles </NavLink>
                        <NavLink to="/starships">Starships</NavLink>
                        <NavLink to="/species">Species </NavLink>
                        <NavLink to="/planets">Planets </NavLink>
                    </ul>


                </nav>
            </header>
        </>
    )
}

export default Header