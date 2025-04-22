
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Kendaraan from './components/pages/Kendaraan';
import Peminjaman from './components/pages/Peminjaman';
import Pengembalian from './components/pages/Pengembalian';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Loading from './components/pages/Loading';
import Histori from './components/pages/Histori';
import Sidebar from './components/Sidebar';
import Daftarkendaraan from'./components/pages/Dashboard/DaftarKendaraan';
import DaftarPeminjaman from './components/pages/Dashboard/DaftarPeminjaman';
import Dashboard from './components/pages/Dashboard/Dashboard';
import DaftarPengembalian from './components/pages/Dashboard/DaftarPengembalian';
import TambahKendaraan from './components/pages/Dashboard/Tambahkendaraan';
import Profil from './components/Profil';
import Preview from './components/Preview';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kendaraan" element={<Kendaraan />} />
        <Route path="/peminjaman" element={<Peminjaman />} />
        <Route path="/pengembalian" element={<Pengembalian />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/histori" element={<Histori />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/dashboard/daftarkendaraan" element={<Daftarkendaraan />} />
        <Route path="/dashboard/daftarpeminjaman" element={<DaftarPeminjaman />} />
        <Route path="/dashboard/daftarpengembalian" element={<DaftarPengembalian />} />
        <Route path="/dashboard/pengguna" element={<Pengembalian />} />
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/tambahkendaraan" element={<TambahKendaraan />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/preview" element={<Preview/>} />

      </Routes>
    </Router>
  );
}

export default App;
