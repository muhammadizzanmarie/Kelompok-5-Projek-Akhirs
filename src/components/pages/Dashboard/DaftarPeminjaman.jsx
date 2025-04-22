import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../Sidebar";


const API_BASE = "https://probne.rikpetik.site/api/v1/peminjaman";

const PeminjamanAdmin = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    nama: "",
    alamat: "",
    no_telepon: "",
    instansi: "",
    kendaraan: "",
    kondisi_kendaraan: "",
    bensin_awal: "",
    sisa_etol: "",
    tanggal_peminjaman: "",
    foto_ktp: null,
    foto_wajah: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE);
      const extractedData =
        response.data?.data ||
        response.data?.peminjaman ||
        response.data ||
        [];
      setData(extractedData);
    } catch (err) {
      console.error("❌ Gagal fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setFormData({
        ...item,
        foto_ktp: null,
        foto_wajah: null,
      });
      setEditId(item.id);
    } else {
      setFormData({
        user_id: "",
        nama: "",
        alamat: "",
        no_telepon: "",
        instansi: "",
        kendaraan: "",
        kondisi_kendaraan: "",
        bensin_awal: "",
        sisa_etol: "",
        tanggal_peminjaman: "",
        foto_ktp: null,
        foto_wajah: null,
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

    const userIdFromSession = localStorage.getItem("user_id") || "7"; // sesuaikan jika ada session login
    const updatedFormData = { ...formData, user_id: userIdFromSession };

    // Format tanggal menjadi yyyy-MM-dd
    if (updatedFormData.tanggal_peminjaman) {
      const date = new Date(updatedFormData.tanggal_peminjaman);
      updatedFormData.tanggal_peminjaman = date.toISOString().slice(0, 10); // '2025-01-11'
    }

    // Debugging: Log updatedFormData sebelum dikirim
    console.log("Data yang akan dikirim:", updatedFormData);

    const form = new FormData();
    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        form.append(key, value);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (editId) {
        // UPDATE dengan PUT
        const response = await axios.put(`${API_BASE}/${editId}`, form, config); 
        console.log(response.data); // Debugging response server
      } else {
        // CREATE dengan POST
        const response = await axios.post(`${API_BASE}/create`, form, config);
        console.log(response.data); // Debugging response server
      }

      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error("❌ Gagal simpan data", err.response?.data || err.message);
      alert(`Gagal menyimpan data: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchData();
      } catch (err) {
        console.error("❌ Gagal hapus data", err);
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
              <Button className="btn-responsive" variant="success" onClick={() => handleShowModal()}>
                Tambah Peminjaman
              </Button>
            </Col>
          </Row>

          <Table className="table-responsive-custom" striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Instansi</th>
                <th>Kendaraan</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.instansi}</td>
                    <td>{item.kendaraan}</td>
                    <td>{item.tanggal_peminjaman}</td>
                    <td>
                      <Button
                        className="btn-responsive me-2"
                        size="sm"
                        variant="warning"
                        onClick={() => handleShowModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-responsive"
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
            <Modal.Title>
              {editId ? "Edit Peminjaman" : "Tambah Peminjaman"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>No Telepon</Form.Label>
                    <Form.Control
                      name="no_telepon"
                      value={formData.no_telepon}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Instansi</Form.Label>
                    <Form.Control
                      name="instansi"
                      value={formData.instansi}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Kendaraan</Form.Label>
                    <Form.Select
                      name="kendaraan"
                      value={formData.kendaraan}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih Kendaraan</option>
                      <option value="mobil">Mobil</option>
                      <option value="motor">Motor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Kondisi Kendaraan</Form.Label>
                    <Form.Control
                      name="kondisi_kendaraan"
                      value={formData.kondisi_kendaraan}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Bensin Awal</Form.Label>
                    <Form.Control
                      name="bensin_awal"
                      value={formData.bensin_awal}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Sisa e-Toll</Form.Label>
                    <Form.Control
                      name="sisa_etol"
                      value={formData.sisa_etol}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Tanggal Peminjaman</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal_peminjaman"
                      value={formData.tanggal_peminjaman}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Foto KTP</Form.Label>
                    <Form.Control
                      type="file"
                      name="foto_ktp"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Foto Wajah</Form.Label>
                    <Form.Control
                      type="file"
                      name="foto_wajah"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button className="btn-responsive mt-3" type="submit" variant="primary">
                {editId ? "Update" : "Tambah"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PeminjamanAdmin;
