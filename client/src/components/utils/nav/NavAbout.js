import React from "react";
import "./nav.css";

export const NavAbout = () => {
  return (
    <>
      <li class="nav-item dropdown">
        {" "}
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          About us
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          
          <li>
            <a class="dropdown-item " href="/services">
              Service
            </a>
          </li>
          <li>
            <a class="dropdown-item " href="/About">
              About
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};
