import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();

  const logout = async () => {
    setLoading(true);
    try {
      // Panggil API backend untuk menghapus cookie
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Hapus data pengguna dari penyimpanan lokal browser
      localStorage.removeItem("chat-user");

      // Kosongkan memori global Zustand
      setAuthUser(null);
    } catch (error: any) {
      console.error("Gagal keluar:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
