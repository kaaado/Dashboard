import axios from "axios";
import { NavLink, Link } from "react-router-dom"
import Cookies from "universal-cookie"
export default function Header() {
    const cookie = new Cookies();
    const token = cookie.get('Bearer')

    async function handleLogout() {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        cookie.remove('Bearer')
        window.location.pathname = '/';
    }
    return (
        <div className="container">
            <nav className="d-flex-sps-btwn ">
                <div className="nav-link d-flex-sps-btwn ">
                    <NavLink to="/"><h5>Home</h5></NavLink>
                    <NavLink to="/about"><h5>About</h5></NavLink>
                </div>
                <div className="nav-button d-flex-sps-btwn ">
                    {!token ? (<>
                        <Link to="/register"><button className="registre-button" type="submit">Register</button></Link>
                        <Link to="/login"><button className="registre-button" type="submit">Login</button></Link>
                    </>) : (
                        <button className="registre-button" type="submit" onClick={handleLogout}>Logout</button>
                    )}
                </div>

            </nav >
        </div >
    )
}