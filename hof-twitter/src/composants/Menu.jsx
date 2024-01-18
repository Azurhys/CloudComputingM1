import { NavLink, useNavigate } from "react-router-dom";
import  Logo  from '/Logo.png'

const Menu = () => {
    return ( <div className="bg-dark mb-3">
    <nav className="navbar navbar-expand navbar-dark container">
        <span className="navbar-brand fs-3">
            <NavLink to='/'>
                <img src={Logo} style={{height: 64}}/>
            </NavLink>
        </span>
    </nav>
    </div> 
    );
}
 
export default Menu;