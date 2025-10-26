import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { AboutPage } from "../pages/AboutPage";
import { EstimatesPage } from "../pages/EstimatesPage";
import { EstimatePage } from "../pages/EstimatePage";
import { TemplatesPage } from "../pages/TemplatesPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/estimates/" element={<EstimatesPage />} />
        <Route path="/estimates/:estimateId" element={<EstimatePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};
