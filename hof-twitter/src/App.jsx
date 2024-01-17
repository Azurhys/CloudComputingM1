import Menu from "./composants/Menu";
import { Link, Outlet } from "react-router-dom";


function App() {

  return (
    <div className="page">
    <Menu />
    <div className="container">
      <Outlet />
    </div>
  </div>
    
  )
}

export default App
