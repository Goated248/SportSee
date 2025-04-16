import "./Navbar.css"
import React from "react"
import logo from '../../assets/logo.png'
const Navbar = () => {

    return (
        <header>
            <img src={logo} alt="logo SportSee" />
            <nav className="nav">
                <ul className="nav-items">
                    <li className="nav-link">Acceuil</li>
                    <li className="nav-link">Profil</li>
                    <li className="nav-link">Réglage</li>
                    <li className="nav-link">Communauté</li>
                </ul>
            </nav>
        </header>
    )

}
export default Navbar