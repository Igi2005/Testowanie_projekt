import {Nav} from "../src/Components/Nav"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { routes } from '../src/Routing'
import { Footer } from "./Components/Footer";

function App() {
  return (
    <Router>
      <Nav></Nav>
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
    <Footer></Footer>
  </Router>
  );
}

export default App;
