import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marceneiros from './pages/Marceneiros';
import MarceneiroDetalhe from './pages/MarceneiroDetalhe';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/marceneiros"        element={<Marceneiros />} />
        <Route path="/marceneiros/:id"    element={<MarceneiroDetalhe />} />
        <Route path="/login"              element={<Login />} />
        <Route path="/cadastro"           element={<Cadastro />} />
        <Route path="/dashboard"          element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}
