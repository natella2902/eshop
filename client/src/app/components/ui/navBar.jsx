import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <div className="container">
            <nav className="navbar bg-light mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/">
                                Main
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/product">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/cart">
                                Cart
                            </Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/users"
                                >
                                    Users
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <NavProfile />
                        ) : (
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/login"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
