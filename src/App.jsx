import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import Home from "./pages/Home";
import LuoghiDaVedere from './pages/LuoghiDaVedere.jsx';
import Itinerari from './pages/Itinerari.jsx';
import ChiSiamo from './pages/ChiSiamo.jsx';
import Eventi from './pages/Eventi.jsx';
import CosaMangiare from './pages/CosaMangiare.jsx';
import StoriaTradizioni from './pages/StoriaTradizioni.jsx';
import Risultati from './pages/Risultati.jsx';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/storia-e-tradizioni" element={<StoriaTradizioni />} />
          <Route path="/category/luoghi-da-visitare" element={<LuoghiDaVedere />} />
          <Route path="/itinerari" element={<Itinerari />} />
          <Route path="/category/eventi" element={<Eventi />} />
          <Route path="/category/cosa-mangiare" element={<CosaMangiare />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/risultati" element={<Risultati />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
