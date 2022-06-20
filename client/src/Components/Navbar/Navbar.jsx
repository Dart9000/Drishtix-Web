import React from 'react'
import styles from "./Navbar.module.css";
import { Link, Navigate } from 'react-router-dom';


const Navbar = () => {
  return (
  <div>
    <nav className={`${styles.navbar}`}>
        <div className={`${styles.navbar_container} ${styles.container}`}>
            <input type="checkbox"  />
            <div className={`${styles.hamburger_lines}`}>
                <span className={`${styles.line} ${styles.line1}`}></span>
                <span className={`${styles.line} ${styles.line2}`}></span>
                <span className={`${styles.line} ${styles.line3}`}></span>
            </div>
            <ul className={`${styles.menu_items}`}>
              
               <li> <a >  <Link to="register">Register User </Link> </a> </li>
               <li> <a >  <Link to="">Home </Link> </a> </li>
            </ul>
            <h1 className={`${styles.logo}`}>Drishtix</h1>
        </div>
    </nav>
  </div>
  )
}

export default Navbar