import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('https://backend-production-6bda.up.railway.app/api/v1/auth/forgot-password', { email });
      setMessage(res.data.msg); // Berhasil
    } catch (err) {
      setError(err.response?.data?.msg || 'Terjadi kesalahan');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#a0e3f0] px-4 py-10">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 order-1 md:order-2">
        
        {/* Left Side: Logo + Text */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center">
          <img
            src="/LOGO1.png"
            alt="Nutrivision Logo"
            className="w-[250px] md:w-[350px] h-auto object-contain"
          />
          <h1 className="text-green-800 font-bold text-xl mt-4">NUTRIVISION</h1>
          <p className="text-sm text-gray-700 mt-2">
            SCAN YOUR FOOD <br /> SHAPE YOUR HEALTH
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1 text-center md:text-center">
            WELCOME TO <span className="text-green-700">NUTRIVISION</span>
          </h2>
          <p className="text-gray-700 text-2xl font-semibold mb-4 text-center md:text-center">
            Scan Your Food, Shape Your Health
          </p>
          <p className="text-sm text-gray-900 font-bold  mb-6 text-center md:text-center">
            Forgot Your Password?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-100 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 font-semibold transition"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
