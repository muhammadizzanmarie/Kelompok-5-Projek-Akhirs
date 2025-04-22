import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../Sidebar";
import "./RentalKen.css";

const API_BASE = "https://probne.rikpetik.site/api/v1/kendaraan";

const KendaraanAdmin = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    nomor_plat: "",
    foto_kendaraan: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE);
      const extractedData =
        response.data?.data ||
        response.data?.kendaraan ||
        response.data ||
        [];
      setData(Array.isArray(extractedData) ? extractedData : []);
    } catch (err) {
      console.error("❌ Gagal fetch data kendaraan", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setFormData({
        nama: item.nama || "",
        jenis: item.jenis || "",
        nomor_plat: item.nomor_plat || "",
        foto_kendaraan: null,
      });
      setEditId(item.id);
    } else {
      setFormData({
        nama: "",
        jenis: "",
        nomor_plat: "",
        foto_kendaraan: null,
      });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") form.append(key, value);
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, form, config);
      } else {
        await axios.post(`${API_BASE}/`, form, config);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error("❌ Gagal simpan data", err.response?.data || err.message);
      alert(`Gagal menyimpan data: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kendaraan ini?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchData();
      } catch (err) {
        console.error("❌ Gagal hapus data kendaraan", err);
      }
    }
  };

  return (
    <div className="d-flex-responsive">
      <Sidebar />
      <div className="content-wrapper" style={{ flex: 1, padding: "20px" }}>
        <Container>
          <Row className="mb-3">
            <Col className="text-end">
              <Button variant="success" onClick={() => handleShowModal()}>
                Tambah Kendaraan
              </Button>
            </Col>
          </Row>

          <Table className="table-responsive-custom" striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kendaraan</th>
                <th>Jenis</th>
                <th>Nomor Plat</th>
                <th>Foto</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data kendaraan
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.jenis}</td>
                    <td>{item.nomor_plat}</td>
                    <td>
                      {item.foto_kendaraan ? (
                        <img
                          src={
                            item.foto_kendaraan.startsWith("http")
                              ? item.foto_kendaraan
                              : `https://probne.rikpetik.site/uploads/${item.foto_kendaraan}`
                          }
                          alt="Foto Kendaraan"
                          style={{
                            width: "100px",
                            height: "auto",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "Tidak ada foto"
                      )}
                    </td>
                    <td>
                      <Button
                        className="me-2"
                        size="sm"
                        variant="warning"
                        onClick={() => handleShowModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Kendaraan" : "Tambah Kendaraan"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Nama Kendaraan</Form.Label>
                    <Form.Control
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Jenis</Form.Label>
                    <Form.Select
                      name="jenis"
                      value={formData.jenis}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih Jenis</option>
                      <option value="mobil">Mobil</option>
                      <option value="motor">Motor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Nomor Plat</Form.Label>
                    <Form.Control
                      name="nomor_plat"
                      value={formData.nomor_plat}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Foto Kendaraan</Form.Label>
                    <Form.Control
                      type="file"
                      name="foto_kendaraan"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button className="mt-3" type="submit" variant="primary">
                {editId ? "Update" : "Tambah"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default KendaraanAdmin;
