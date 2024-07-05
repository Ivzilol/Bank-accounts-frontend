import {useUser} from "../../userPrivider/UserProvider";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";
import './NavBar.css'

const Navbar = () => {
    const user = useUser();
    const [authorities, setAuthorities] = useState(null);
    const [roles, setRoles] = useState(getRolesFromJWT());

    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            return decodeJwt.sub;
        }
        return [];
    }

    useEffect(() => {
        if (user && user.jwt) {
            const decodeJwt = jwtDecode(user.jwt);
            setAuthorities(decodeJwt.authorities);
        }
    }, [user]);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">MyApp</Link>
                <div className="navbar-menu">
                    {user && user.jwt ? (
                        <>
                            <Link to="/" className="navbar-item">Homepage</Link>
                            <Link to="/create" className="navbar-item">New Account</Link>
                            <button onClick={() => user.setJwt(null)}
                                    className="navbar-item">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-item">Login</Link>
                            <Link to="/register" className="navbar-item">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;