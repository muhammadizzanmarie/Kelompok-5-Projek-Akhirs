import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCar, FaClipboardList, FaUserFriends } from "react-icons/fa";
import Sidebar from "../../Sidebar";

const API_BASE = "https://probne.rikpetik.site/api/v1/kendaraan";

const DashboardPeminjamanKendaraan = () => {
  const [kendaraanData, setKendaraanData] = useState([]);
  const [peminjamanAktif, setPeminjamanAktif] = useState(0);
  const [penggunaTerbanyak, setPenggunaTerbanyak] = useState(0);

  const fetchKendaraanData = async () => {
    try {
      const response = await axios.get(API_BASE);
      console.log("Response API Kendaraan:", response);

      if (response.status === 200) {
        const kendaraanList = response.data?.data?.kendaraan || response.data || [];
        console.log("✅ List kendaraan:", kendaraanList);

        setKendaraanData(kendaraanList);

        const activeRentals = kendaraanList.filter((item) => item.status === "aktif").length;
        setPeminjamanAktif(activeRentals);

        const mostFrequentUser = kendaraanList.length > 0 ? kendaraanList[0].user_id : 0;
        setPenggunaTerbanyak(mostFrequentUser);
      } else {
        console.error("API tidak mengembalikan status OK:", response.status);
      }
    } catch (err) {
      console.error("❌ Gagal mengambil data kendaraan:", err);
    }
  };

  useEffect(() => {
    fetchKendaraanData();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content-wrapper">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h3 className="fw-bold text-primary">Dashboard Peminjaman Kendaraan</h3>
            <p className="text-muted">Statistik peminjaman kendaraan secara real-time</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-sm-6 col-lg-4">
              <div className="card card-stat">
                <div>
                  <h6 className="text-muted mb-1">Total Kendaraan</h6>
                  <h3 className="fw-bold">{kendaraanData.length}</h3>
                </div>
                <div className="icon-box bg-primary text-white">
                  <FaCar className="fs-4" />
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="card card-stat">
                <div>
                  <h6 className="text-muted mb-1">Peminjaman Aktif</h6>
                  <h3 className="fw-bold">{peminjamanAktif}</h3>
                </div>
                <div className="icon-box bg-warning text-white">
                  <FaClipboardList className="fs-4" />
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="card card-stat">
                <div>
                  <h6 className="text-muted mb-1">Pengguna Terbanyak</h6>
                  <h3 className="fw-bold">{penggunaTerbanyak}</h3>
                </div>
                <div className="icon-box bg-success text-white">
                  <FaUserFriends className="fs-4" />
                </div>
              </div>
            </div>
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
            padding: 2rem;
            transition: margin-left 0.3s ease;
          }

          .card-stat {
            border-radius: 12px;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
          }

          .card-stat:hover {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-3px);
          }

          .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px;
            border-radius: 50%;
            min-width: 48px;
            min-height: 48px;
          }

          .bg-warning {
            background-color: #ffc107 !important;
            color: #000 !important;
          }

          .text-muted {
            font-size: 0.9rem;
          }

          @media (max-width: 992px) {
            .content-wrapper {
              margin-left: 0;
              padding: 1.5rem;
            }

            .card-stat {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
              padding: 1.25rem;
            }

            .icon-box {
              align-self: flex-end;
            }
          }

          @media (max-width: 768px) {
            .row.g-4 {
              flex-direction: column;
              gap: 1.5rem;
            }

            .col-sm-6.col-lg-4 {
              width: 100%;
              max-width: 100%;
            }

            .text-center.mb-5 h3 {
              font-size: 1.5rem;
            }

            .text-center.mb-5 p {
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .card-stat {
              padding: 1rem;
            }

            h3.fw-bold {
              font-size: 1.2rem;
            }

            h6.text-muted {
              font-size: 0.8rem;
            }

            .icon-box {
              min-width: 40px;
              min-height: 40px;
              padding: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardPeminjamanKendaraan;
