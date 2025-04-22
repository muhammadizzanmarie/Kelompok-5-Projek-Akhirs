import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../Sidebar";

const TambahKendaraan = () => {
  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    nomorPlat: "",
    kapasitas: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data dikirim:", formData);
    // Tambahkan API call di sini menggunakan axios atau fetch
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content-wrapper p-4">
        <div className="container">
          <h3 className="fw-bold text-primary mb-4">Tambah Kendaraan</h3>

          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nama Kendaraan</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Contoh: Toyota Avanza"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Jenis Kendaraan</label>
                <select
                  className="form-select"
                  name="jenis"
                  value={formData.jenis}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Pilih Jenis --</option>
                  <option value="Mobil">Mobil</option>
                  <option value="Motor">Motor</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nomor Plat</label>
                <input
                  type="text"
                  className="form-control"
                  name="nomorPlat"
                  value={formData.nomorPlat}
                  onChange={handleChange}
                  placeholder="Contoh: B 1234 XYZ"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Kapasitas Penumpang</label>
                <input
                  type="number"
                  className="form-control"
                  name="kapasitas"
                  value={formData.kapasitas}
                  onChange={handleChange}
                  min={1}
                  placeholder="Contoh: 7"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Keterangan</label>
                <textarea
                  className="form-control"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleChange}
                  placeholder="Tambahkan catatan jika ada"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Simpan Kendaraan
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>
        {`
          .content-wrapper {
            margin-left: 250px;
            width: 100%;
            min-height: 100vh;
            background-color: #f8f9fa;
          }

          .card {
            border-radius: 12px;
          }

          .form-label {
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
};

export default TambahKendaraan;
