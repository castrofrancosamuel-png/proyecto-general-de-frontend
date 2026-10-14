import React, { useState, useRef } from 'react'
import "./Navbar.css";

const Navbar = ({ textos, cargando, error }) => {

    const [abierto, setAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState(""); //Sin valor a buscar
    const bottonMenu = useRef(null);
    const campoBusqueda = useRef(null);
    const nav = textos?.Navbar;
    const ingles = idioma === "en";//Toma el valor de idioma unicamnete si es ingles
    const enlaces = Object.entries(nav?.enlaces ?? {})


    return (
        <header className="navbar">
            <nav
                className="contenedor navbar-interior" aria-label="Navegacion Principal"
            >
                <a href="" className="navbar-marca" hre="#inicio">
                    <span className="navbar-simbolo" aria-hidden="true">
                        R
                    </span>
                    <span>Mi sitio React</span>
                </a>
                <div className="navbar-panel">
                    <ul className="navbar-enlaces">
                        <li><a href="#Inicio">inicio</a></li>
                        <li><a href="#Practica">Practica</a></li>
                        <li><a href="#Contacto">Contacto</a></li>
                    </ul>
                    <a href="#practica" className="navbar-accion">
                        Comenzar
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
