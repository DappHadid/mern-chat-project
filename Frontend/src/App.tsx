import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthStore } from "./zustand/useAuthStore";

function App() {
  // 1. Ambil status pengguna dari memori global (Zustand)
  const { authUser } = useAuthStore();

  return (
    <>
      <Routes>
        {/* 2. Jika sudah login, buka Home. Jika belum, lempar ke Login */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />

        {/* 3. Jika sudah login, lempar ke Home. Jika belum, buka Login */}
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />

        {/* 4. Jika sudah login, lempar ke Home. Jika belum, buka SignUp */}
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
    </>
  );
}

export default App;
