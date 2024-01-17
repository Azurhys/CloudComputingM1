import Accueil from "./composants/Accueil";
import Menu from "./composants/Menu";
import { Link, Outlet } from "react-router-dom";


function App() {

  return (
    <div className="page bg-secondary ">
    <Menu />
    <div className="container " >
      <Outlet />
      <Accueil />
    </div>
  </div>
    
  )
}

export default App
