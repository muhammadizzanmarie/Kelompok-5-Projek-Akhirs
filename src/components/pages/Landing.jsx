import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css'; // kita styling di sini

const images = [
  'img/1.png',
  'img/2.png',
  'img/3.png',
];

const Landing = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Ganti gambar tiap 4 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="landing-hero d-flex justify-content-center align-items-center text-white text-center"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="overlay"></div>
      <div className="z-2">
        <h1 className="display-3 fw-bold mb-4">Selamat Datang di <span className="text-warning">AutoRent</span></h1>
        <p className="lead mb-4">Sewa kendaraan cepat, mudah, dan terpercaya!</p>
        <div>
          <Button as={Link} to="/kendaraan" variant="warning" className="custom-btn-yellow me-3" >
            Lihat Kendaraan
          </Button>
          <Button as={Link} to="/register" variant="outline-light" className="custom-btn-outline">
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
