import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    return ( <div className="bg-dark mb-3">
    <nav className="navbar navbar-expand navbar-dark container">
        <span className="navbar-brand fs-3">
            LOGO VIGIER AVOCATS
        </span>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}>Masterclass</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}></NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/" className={({isActive}) => {
                    return isActive ? "nav-link active text-light" : "nav-link"
                }}>Satisfaction</NavLink>
            </li>
        </ul>
    </nav>
    </div> 
    );
}
 
export default Menu;