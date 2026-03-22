import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";

// Toast context-like singleton
let _addToast = null;
export function addToast(message, type = "success") {
  if (_addToast) _addToast(message, type);
}

function AppContent() {
  const [toasts, setToasts] = useState([]);

  _addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main">
        <AppRoutes />
      </main>
      <Footer />
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <JobProvider>
            <AppContent />
          </JobProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
