import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();

  const signup = async (inputs: any) => {
    setLoading(true);
    try {
      // Mengirim data ke server backend kita
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Simpan tiket akun ke penyimpanan lokal browser
      localStorage.setItem("chat-user", JSON.stringify(data));

      // Beritahu aplikasi bahwa pengguna sudah login
      setAuthUser(data);
    } catch (error: any) {
      console.error("Gagal mendaftar:", error.message);
      alert(error.message); // Menampilkan pesan eror sementara
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
