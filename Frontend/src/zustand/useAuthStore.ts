import { create } from "zustand";

interface AuthState {
  authUser: any;
  setAuthUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Cek apakah ada data pengguna yang tersimpan di penyimpanan lokal browser
  authUser: JSON.parse(localStorage.getItem("chat-user") || "null"),
  setAuthUser: (user) => set({ authUser: user }),
}));
