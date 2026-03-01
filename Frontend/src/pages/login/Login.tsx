import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream-base p-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg className="absolute top-10 left-10 w-24 h-24 text-gray-300 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <svg className="absolute bottom-10 right-20 w-32 h-32 text-gray-300 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="1"></circle>
        </svg>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full gap-10 z-10">
        <div className="flex-1 max-w-md w-full p-8 rounded-2xl shadow-2xl bg-pure-white border border-gray-100 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-dark">Selamat Datang Kembali</h2>
            <p className="text-gray-500 mt-2 text-sm">Silakan masuk untuk melanjutkan ke ChatApp</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-text-dark mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineAlternateEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Contoh: daffa@email.com"
                  value={inputs.email}
                  onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cream-base border-transparent focus:border-maroon-primary focus:bg-pure-white focus:ring-1 focus:ring-maroon-primary text-text-dark transition-all"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-text-dark mb-2">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLockOutline className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Masukkan sandi Anda"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cream-base border-transparent focus:border-maroon-primary focus:bg-pure-white focus:ring-1 focus:ring-maroon-primary text-text-dark transition-all"
                />
                <a
                  href="#"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-maroon-primary hover:text-maroon-hover font-medium"
                >
                  Lupa?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-block h-12 bg-maroon-primary text-pure-white hover:bg-maroon-hover border-none font-bold text-lg transition-colors rounded-lg shadow-md hover:shadow-lg mb-6 disabled:opacity-50"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Masuk Sekarang"}
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full absolute"></div>
              <span className="bg-pure-white px-4 text-xs text-gray-500 relative z-10 font-medium">ATAU MASUK DENGAN</span>
            </div>

            <button
              type="button"
              className="btn btn-block h-11 bg-pure-white border border-gray-300 hover:bg-gray-50 text-text-dark flex items-center justify-center gap-2 transition-all rounded-lg font-medium"
            >
              <FcGoogle className="h-5 w-5" /> Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Belum punya akun?{" "}
            <Link to="/signup" className="text-maroon-primary hover:text-maroon-hover font-bold transition-colors hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>

        <div className="flex-1 max-w-lg hidden md:block text-center relative">
          <div className="relative z-10 p-6">
            <img
              src="https://i.ibb.co/vV01Z4D/undraw-chatting-re-j55r.png"
              alt="Ilustrasi Obrolan"
              className="w-full h-auto drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-3xl font-bold text-maroon-primary mt-8">Terhubung dengan Mudah.</h2>
            <p className="text-text-dark mt-4 text-lg leading-relaxed">
              Nikmati pengalaman chatting yang lancar dan menyenangkan dengan teman dan kolega Anda di ChatApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
