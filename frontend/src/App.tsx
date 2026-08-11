import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ReportDetailPage from "./pages/ReportDetailPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reports/:reportId" element={<ReportDetailPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </div>
  );
}
