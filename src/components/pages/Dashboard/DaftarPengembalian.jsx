import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../Sidebar";

const API_BASE = "https://probne.rikpetik.site/api/v1/pengembalian";

const DaftarPengembalian = () => {
  const [pengembalian, setPengembalian] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    peminjaman_id: "",
    kondisi_kendaraan: "",
    bensin_akhir: "",
    sisa_etol: "",
    tanggal_pengembalian: "",
    keterangan: "",
    status: "diproses",
  });

  useEffect(() => {
    fetchPengembalian();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPengembalian = async () => {
    try {
      const res = await axios.get(API_BASE);
      setPengembalian(res.data || []);
    } catch (err) {
      console.error("❌ Gagal mengambil data pengembalian:", err);
    }
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setFormData({ ...item });
      setEditId(item.id);
    } else {
      setFormData({
        peminjaman_id: "",
        kondisi_kendaraan: "",
        bensin_akhir: "",
        sisa_etol: "",
        tanggal_pengembalian: "",
        keterangan: "",
        status: "diproses",
      });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      peminjaman_id: parseInt(formData.peminjaman_id),
      kondisi_kendaraan: formData.kondisi_kendaraan,
      bensin_akhir: parseFloat(formData.bensin_akhir),
      sisa_etol: parseFloat(formData.sisa_etol),
      tanggal_pengembalian: formData.tanggal_pengembalian,
      keterangan: formData.keterangan,
      status: formData.status,
    };

    try {
      const url = editId ? `${API_BASE}/${editId}` : `${API_BASE}/create`;
      const method = editId ? "put" : "post";

      await axios[method](url, dataToSend);
      fetchPengembalian();
      handleCloseModal();
    } catch (err) {
      console.error("❌ Gagal simpan:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchPengembalian();
      } catch (err) {
        console.error("❌ Gagal hapus:", err.message);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      {/* Sidebar berada di atas pada tampilan mobile */}
      <Sidebar />
      <div className="content-wrapper" style={{ flex: 1, padding: "20px" }}>
        <Container>
          <div className="text-end mb-3">
            <Button variant="success" onClick={() => handleShowModal()}>
              Tambah
            </Button>
          </div>

          {/* Jika bukan tampilan mobile, tampilkan tabel. Jika mobile, tampilkan dalam bentuk kartu */}
          {!isMobile ? (
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>No</th>
                  <th>Peminjaman ID</th>
                  <th>Kondisi</th>
                  <th>Bensin</th>
                  <th>e-Toll</th>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengembalian.length > 0 ? (
                  pengembalian.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.peminjaman_id}</td>
                      <td>{item.kondisi_kendaraan}</td>
                      <td>{item.bensin_akhir}</td>
                      <td>{item.sisa_etol}</td>
                      <td>{item.tanggal_pengembalian}</td>
                      <td>{item.keterangan}</td>
                      <td><span className="badge bg-success">{item.status}</span></td>
                      <td>
                        <Button size="sm" variant="warning" onClick={() => handleShowModal(item)} className="me-2">Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Hapus</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">Belum ada data.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          ) : (
            pengembalian.map((item, index) => (
              <Card key={item.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-2">Pengembalian #{index + 1}</Card.Title>
                  <p><strong>Peminjaman ID:</strong> {item.peminjaman_id}</p>
                  <p><strong>Kondisi:</strong> {item.kondisi_kendaraan}</p>
                  <p><strong>Bensin Akhir:</strong> {item.bensin_akhir}</p>
                  <p><strong>Sisa e-Toll:</strong> {item.sisa_etol}</p>
                  <p><strong>Tanggal:</strong> {item.tanggal_pengembalian}</p>
                  <p><strong>Keterangan:</strong> {item.keterangan}</p>
                  <p><strong>Status:</strong> <span className="badge bg-success">{item.status}</span></p>
                  <div className="d-flex justify-content-end">
                    <Button size="sm" variant="warning" className="me-2" onClick={() => handleShowModal(item)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Hapus</Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Container>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Pengembalian" : "Tambah Pengembalian"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Peminjaman ID</Form.Label>
                    <Form.Control name="peminjaman_id" type="number" value={formData.peminjaman_id} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Kondisi Kendaraan</Form.Label>
                    <Form.Control name="kondisi_kendaraan" value={formData.kondisi_kendaraan} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Bensin Akhir</Form.Label>
                    <Form.Control name="bensin_akhir" type="number" value={formData.bensin_akhir} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Sisa e-Toll</Form.Label>
                    <Form.Control name="sisa_etol" type="number" value={formData.sisa_etol} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Tanggal Pengembalian</Form.Label>
                    <Form.Control type="date" name="tanggal_pengembalian" value={formData.tanggal_pengembalian} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Keterangan</Form.Label>
                    <Form.Control name="keterangan" value={formData.keterangan} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                      <option value="diproses">Diproses</option>
                      <option value="telah dikembalikan">Telah Dikembalikan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="primary" className="mt-3">
                {editId ? "Update" : "Tambah"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DaftarPengembalian;
