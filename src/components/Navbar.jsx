import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const MyNavbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  const userName = localStorage.getItem('name') || 'User';
  const userPhoto = localStorage.getItem('photo'); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('photo');
    navigate('/login');
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#007BFF' }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">AutoRent</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Beranda</Nav.Link>
            <Nav.Link as={Link} to="/kendaraan">Kendaraan</Nav.Link>
            <Nav.Link as={Link} to="/preview">Preview</Nav.Link>
            <Nav.Link as={Link} to="/pengembalian">Pengembalian</Nav.Link>
          </Nav>

          <Nav>
            {isLoggedIn ? (
              <NavDropdown
                title={
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {userPhoto && (
                      <Image
                        src={userPhoto}
                        roundedCircle
                        width="30"
                        height="30"
                        className="me-2"
                        style={{ objectFit: 'cover' }}
                        alt="User Profile"
                      />
                    )}
                    Hi, {userName}
                  </span>
                }
                id="user-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
