import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import Home from "./pages/Home";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
