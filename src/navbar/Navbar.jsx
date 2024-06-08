import React, { useRef } from "react";
import './Navbar.css';
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/Group 13.png';


const Navbar=()=>{
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
    }
    return (
        <header>
        <h3>Insight Lab</h3>
        <nav ref={navRef}>
            <a href="/#">Início</a>
            <a href="/#">Sobre</a>
            <a href="/#">Blog</a>
            
            <button
                className="nav-btn nav-close-btn"
                onClick={showNavbar}>
                <FaTimes />
            </button>
        </nav>
        <button
            className="nav-btn"
            onClick={showNavbar}>
            <FaBars />
        </button>
    </header>
    )
}


export default Navbar;