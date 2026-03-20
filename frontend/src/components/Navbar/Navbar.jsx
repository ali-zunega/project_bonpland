import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar d-flex justify-content-between align-items-center p-3">
        <h1>Bonpland Propiedades</h1>
        <li className="list-unstyled">
            <ul className="d-flex gap-3 list-unstyled mb-0">
                <li><a href="/">Home</a></li>
                <li><a href="/properties">Properties</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </li>
    </nav>
    );
};
export default Navbar;