import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Loading.css"
const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingDone, setLoadingDone] = useState(false);
  const { id } = location.state || {};

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 2000); // simulasi loading 2 detik

    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleGoToHistori = () => {
    navigate('/histori', { state: { id } });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      {!loadingDone ? (
        <h2>Memproses peminjaman...</h2>
      ) : (
        <>
          <h2>Peminjaman berhasil disimpan!</h2>
          <button onClick={handleGoToHistori}>Lihat Histori</button>
        </>
      )}
    </div>
  );
};

export default Loading;
