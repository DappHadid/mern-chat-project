import { FiLogOut } from "react-icons/fi";
import useLogout from "../../hooks/useLogout";
import Conversations from "./Conversations"; // 1. Impor komponen daftar kontak

const Sidebar = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="w-1/3 border-r border-gray-200 flex flex-col bg-pure-white h-full">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Cari teman..."
          className="w-full input input-bordered h-11 bg-cream-base text-text-dark border-transparent focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary focus:outline-none transition-all"
        />
      </div>

      {/* 2. Ganti teks kosong dengan komponen daftar kontak */}
      <div className="flex-1 overflow-auto p-2">
        <Conversations />
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={logout}
          disabled={loading}
          className="flex items-center gap-2 text-maroon-primary hover:text-maroon-hover font-bold transition-colors"
        >
          {loading ? <span className="loading loading-spinner"></span> : <FiLogOut className="w-6 h-6" />}
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
