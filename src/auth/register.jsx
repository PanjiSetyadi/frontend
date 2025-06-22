import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://backend-production-6bda.up.railway.app/api/v1/auth/register', {
        username: fullname,
        email,
        password,
      });

      toast.success('Registrasi berhasil! 🎉');
      console.log(res.data);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Terjadi kesalahan saat registrasi';
      toast.error(msg);
      console.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#A6E3E9] px-4 py-10">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src="/LOGO1.png"
          alt="Nutrivision Logo"
          className="w-[250px] md:w-[350px] h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 px-6 md:px-16">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-800 text-center">
          WELCOME TO <span className="text-green-700">NUTRIVISION</span>
        </h2>
        <p className="text-gray-700 font-semibold text-lg text-center">
          Scan Your Food, Shape Your Health
        </p>
        <p className="text-sm text-gray-800 font-bold mt-2 mb-6 text-center">
          Create your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="block mb-1 font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Create a strong password"
              required
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
                className="w-30 bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-xl transition duration-300 gap-2"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-700">Already have an account?</span>{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
