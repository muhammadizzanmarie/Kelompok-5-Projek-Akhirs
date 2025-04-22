import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Info.css'; // Import CSS untuk efek interaksi

const Info = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        {/* Gambar */}
        <Col md={6} className="position-relative">
          <img
            src="img/about.jpg"
            alt="Car"
            className="img-fluid rounded"
          />
          <div className="experience-box">
            <h2 className="m-0 fw-bold">1</h2>
            <p className="mb-0">Years Experience</p>
          </div>
        </Col>

        {/* Konten */}
        <Col md={6}>
          <h2 className="fw-bold mb-3">
            <span className="text-primary">AutoRent</span> Is The Best Rent For You and free
          </h2>
          <p className="text-muted">
            Kami Memberikan kalian berbagai akses untuk meminjam kendaraan
            100% secara gratis tanpa biaya pajak dan lain hanya dengan cara amanah
          </p>

          {/* List info */}
          <div className="my-4">
            <Card className="mb-3 card-hover">
              <Card.Body className="d-flex">
                <div className="me-3 fw-bold">01</div>
                <div>
                  <div className="fw-semibold">Professional & Expert</div>
                  <div>Kami Bekerja Secara Proffesional</div>
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-3 card-hover">
              <Card.Body className="d-flex">
                <div className="me-3 fw-bold">02</div>
                <div>
                  <div className="fw-semibold">Quality Rent Center</div>
                  <div>Amanah lilla hitaallah</div>
                </div>
              </Card.Body>
            </Card>
            <Card className="card-hover">
              <Card.Body className="d-flex">
                <div className="me-3 fw-bold">03</div>
                <div>
                  <div className="fw-semibold">Free Rent</div>
                  <div>Gratis Minjam tanpa biaya</div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Tombol */}
          <Button variant="primary" className="read-more-btn">
            Read More →
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Info;
