import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://backend-production-6bda.up.railway.app/api/v1/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);

      toast.success('✅ Login berhasil!');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      const msg = err.response?.data?.msg || '❌ Login gagal. Cek email dan password.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#A6E3E9] px-4 py-10">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 order-1 md:order-2">
        <img
          src="/LOGO1.png"
          alt="Nutrivision Logo"
          className="w-[250px] md:w-[350px] h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 px-6 md:px-16 order-2 md:order-1">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-800 text-center md:text-center">
          WELCOME TO <span className="text-green-700">NUTRIVISION</span>
        </h2>
        <p className="text-gray-700 text-lg font-semibold text-center md:text-center">Scan Your Food, Shape Your Health</p>
        <p className="text-sm text-gray-800 font-bold mt-2 mb-6 text-center md:text-center">Login to your account</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="Email" className="block mb-1 font-medium text-gray-800">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label htmlFor="password" className="block mb-1 font-medium text-gray-800">Password</label>
              <Link to="/forgot-password" className="text-sm text-green-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Masukkan Password Anda"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="w-full flex justify-center items-center">
            {loading ? (
              <div className="w-full bg-green-600 text-white py-2 rounded-md text-center">
                Loading...
              </div>
            ) : (
              <button
                type="submit"
                className="w-30 bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl transition duration-300 gap-2"
              >
                Sign In
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-sm text-center">
          Not a member?{' '}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
