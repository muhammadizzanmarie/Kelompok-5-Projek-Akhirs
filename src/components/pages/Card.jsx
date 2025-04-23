import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    icon: '💠',
    title: 'Preview Kendaraan',
    description: 'Kami menyediakan berbagai jenis layanan perawatan kendaraan.',
    link: '/preview',
  },
  {
    icon: '🚗',
    title: 'Pinjam Mobil',
    description: 'Peminjaman mobil gratis dan mudah untuk berbagai keperluan.',
    link: '/peminjaman',
  },
  {
    icon: '🏍️',
    title: 'Pengembalian',
    description: 'Proses pengembalian kendaraan yang mudah dan cepat.',
    link: '/pengembalian',
  },
];

const CardSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5 d-flex justify-content-center gap-4 flex-wrap">
      {cardData.map((card, index) => (
        <div key={index} className="card-box p-4 text-center shadow">
          <div className="icon mb-3 fs-1">{card.icon}</div>
          <h5 className="fw-bold">{card.title}</h5>
          <p>{card.description}</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate(card.link)}
          >
            READ MORE
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
