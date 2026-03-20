import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import HomePage from "./pages/HomePage";
import LuoghiDaVederePage from './pages/LuoghiDaVederePage.jsx';
import ItinerariPage from './pages/ItinerariPage.jsx';
import ChiSiamoPage from './pages/ChiSiamoPage.jsx';
import EventiPage from './pages/EventiPage.jsx';
import CosaMangiarePage from './pages/CosaMangiarePage.jsx';
import StoriaTradizioniPage from './pages/StoriaTradizioniPage.jsx';
import RisultatiPage from './pages/RisultatiPage.jsx';
import DetailContentPage from './pages/DetailContentPage.jsx';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/storia-e-tradizioni" element={<StoriaTradizioniPage />} />
          <Route path="/category/luoghi-da-visitare" element={<LuoghiDaVederePage />} />
          <Route path="/itinerari" element={<ItinerariPage />} />
          <Route path="/category/eventi" element={<EventiPage />} />
          <Route path="/category/cosa-mangiare" element={<CosaMangiarePage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/risultati" element={<RisultatiPage />} />
          <Route path="/:slug" element={<DetailContentPage />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
