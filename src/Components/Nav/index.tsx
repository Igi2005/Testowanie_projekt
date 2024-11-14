import { routes } from "../../Routing"
import {Link} from "react-router-dom"
import "./style.scss"

export function Nav() {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
        <a className="navbar-brand" href="https://getbootstrap.com/">Projekt do testowania</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          {routes.map((route) => (
            <li key={route.path}> <Link to={route.path}>{route.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</nav>
    )
}