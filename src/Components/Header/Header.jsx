import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
        <header className={styles.header}>
   
        <nav className={styles.nav}>
            
            <div className={styles.navigation}>
            <ul className={styles.menu}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/characters">Characters</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/starships">Starships</NavLink>
            <NavLink to="/vehicles">Vehicles </NavLink>
            <NavLink to="/species">Species </NavLink>
            <NavLink to="/planets">Planets </NavLink>
            </ul>
            </div>
            
        </nav>
        </header>
        </>
    )
}

export default Header