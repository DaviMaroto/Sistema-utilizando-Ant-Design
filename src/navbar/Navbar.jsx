import React, { useRef } from "react";
import './Navbar.css';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar=()=>{
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
    }
    return (
        <header>
        <h3>Logo</h3>
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