import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EtniaApp from './componentsEtnia/EtniaApp'; // Importa el componente EtniaApp
import DiscapacidadApp from './componentsDisc/DiscapacidadApp'; // Importa el componente DiscapacidadApp

const App = () => (
  <Router>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mi Aplicación
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/etnia">
            Etnias
          </Nav.Link>
          <Nav.Link as={Link} to="/discapacidad">
            Discapacidades
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <main>
      <Routes>
        <Route path="/etnia" element={<EtniaApp />} />
        <Route path="/discapacidad" element={<DiscapacidadApp />} />
      </Routes>
    </main>
  </Router>
);

export default App;
