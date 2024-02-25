import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../logo.svg';
import './navbar.css';

function AppNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={logo}
              className="App-logo"
            />{' '}
            HandTrack React
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://github.com/weristdominik">Developer GitHub</Nav.Link>
              <Nav.Link href="https://github.com/weristdominik">Tensorflow</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end ml-5">
            <Navbar.Text>
              Created by: <a href="https://github.com/weristdominik">WerIstDominik</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;