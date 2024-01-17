import { NavLink, useNavigate } from "react-router-dom";
import  Logo  from '/Logo.png'

const Menu = () => {
    return ( <div className="bg-dark mb-3">
    <nav className="navbar navbar-expand navbar-dark container">
        <span className="navbar-brand fs-3">
            <NavLink to='/Accueil'>
                <img src={Logo} style={{height: 64}}/>
            </NavLink>
        </span>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/masterclass" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}>Masterclass</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/flop" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}>Gros Flop</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/chef" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}>Chef ???</NavLink>
            </li>
        </ul>
    </nav>
    </div> 
    );
}
 
export default Menu;