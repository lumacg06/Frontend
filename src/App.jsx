import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import EtniaApp from "./components/componentsEtnia/EtniaApp";
import DiscapacidadApp from "./components/componentsDisc/DiscapacidadApp";
import DniApp from "./components/componentsDNI/DniApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your CSS file

const App = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div className="app-container">
        {/* Fixed top navbar with background image */}
        <Navbar expand={false} fixed="top" className="navbar-custom">
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="logo">
              <img src="/logo.png" alt="Logo" className="logo-img" />
              IPS Salud y Vida
            </Navbar.Brand>
            <Navbar.Toggle
              id="menu-toggle-button" // Cambiado
              aria-controls="offcanvas-navbar"
              onClick={handleShow}
            />
            <Offcanvas
              id="offcanvas-navbar"
              placement="start"
              show={show}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menú</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="nav-link active"
                    onClick={handleClose}
                  >
                    Inicio
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/etnia"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Etnias
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/discapacidad"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Discapacidades
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/tipodocumento"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Tipo Documentos
                  </Nav.Link>
                  <Nav.Link
                    href="#contacto"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Contacto
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        </Navbar>

        {/* Main content area */}
        <main className="main-section">
          <Container fluid className="container-custom">
            <Routes>
              <Route path="/etnia" element={<EtniaApp />} />
              <Route path="/discapacidad" element={<DiscapacidadApp />} />
              <Route path="/tipodocumento" element={<DniApp />} />

              <Route
                path="/"
                element={
                  <div
                    className="hero-section"
                    style={{ backgroundImage: `url()` }}
                  >
                    <div className="hero-content">
                      <h1>Bienvenidos a IPS Salud y Vida</h1>
                      <p>
                        Brindando atención médica de calidad con calidez humana.
                      </p>
                      <Button
                        variant="primary"
                        href="#servicios"
                        className="btn-custom"
                      >
                        Ver nuestros servicios
                      </Button>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Container>
        </main>

        <footer className="footer-section">
          <Container fluid>
            <p>&copy; 2024 IPS Salud y Vida. Todos los derechos reservados.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
};

export default App;
