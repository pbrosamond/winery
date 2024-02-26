import './App.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header/Header';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import FruitIntakePage from './pages/FruitIntakePage/FruitIntakePage';
import CrushOrderPage from './pages/CrushOrderPage/CrushOrderPage';
import LabAnalysisPage from './pages/LabAnalysisPage/LabAnalysisPage';
import AdditivesPage from './pages/AdditivesPage/AdditivesPage';
import RackingPage from './pages/RackingPage/RackingPage';
import BottlingPage from './pages/BottlingPage/BottlingPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />}/>
        <Route path="/fruit-intake" element={<FruitIntakePage />}/>
        <Route path="/crush-order" element={<CrushOrderPage />}/>
        <Route path="/lab-analysis" element={<LabAnalysisPage />}/>
        <Route path="/additives" element={<AdditivesPage />}/>
        <Route path="/racking" element={<RackingPage />}/>
        <Route path="/bottling" element={<BottlingPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
