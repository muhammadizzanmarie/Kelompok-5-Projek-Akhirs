import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-5 pb-4 mt-auto">
      <Container>
        <Row className="mb-4 text-center text-md-start">
          {/* Brand dan deskripsi */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold">AutoRent</h5>
            <p className="small">
              Solusi sewa mobil terpercaya dan mudah untuk perjalanan Anda di seluruh Indonesia.
            </p>
          </Col>

          {/* Navigasi */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h6 className="fw-semibold">Navigasi</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-white text-decoration-none">Tentang Kami</a></li>
              <li><a href="/kendaraan" className="text-white text-decoration-none">Layanan</a></li>
              <li><a href="/preview" className="text-white text-decoration-none">Preview</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login ?</a></li>
            </ul>
          </Col>

          {/* Kontak */}
          <Col xs={12} md={4}>
            <h6 className="fw-semibold">Hubungi Kami</h6>
            <ul className="list-unstyled small">
              <li>Email: support@autorent.com</li>
              <li>Telepon: +62 812 3456 7890</li>
              <li>Alamat: Jl. Merdeka No. 10, Jakarta</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-light" />

        <div className="text-center small">
          © {new Date().getFullYear()} <strong>AutoRent</strong>. Semua hak dilindungi.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
