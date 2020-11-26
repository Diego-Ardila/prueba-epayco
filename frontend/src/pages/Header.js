import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';



function Header() {
  return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/home">
            <img
                alt="logo"
                src="https://res.cloudinary.com/sharedbox/image/upload/v1603386505/Parking%20Alarcon/epayco_elyho0.png"
                className="d-inline-block align-top"
            />{'   '}
            Wallet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login Usuario</Nav.Link>
            <Nav.Link href="/register">Nuevo Usuario</Nav.Link>
            <Nav.Link href="/compras">Compras</Nav.Link>
            <Nav.Link href="/wallet">Billetera</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
                <Nav.Link href="/logout">Cerrar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse >
      </Navbar>
  );
}

export default Header;
