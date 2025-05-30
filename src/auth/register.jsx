import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#a0e3f0] px-4 py-10">

      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src="/src/assets/LOGO1.png"
          alt="Nutrivision Logo"
          className="w-[250px] md:w-[350px] h-auto object-contain"
        />
      </div>

      {/* Form Register */}
      <div className="w-full md:w-1/2 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center md:text-left">
          WELCOME TO <span className="text-green-700">NUTRIVISION</span> 
        </h2>
        <p className="text-gray-700 text-lg text-center md:text-left">
          Scan Your Food, Shape Your Health
        </p>
        <p className="text-sm text-gray-800 font-semibold mt-2 mb-6 text-center md:text-left">
          Create your account
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block mb-1 font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              id="fullname"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Create a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition"
          >
            Create Account
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-800 py-2 rounded-md hover:bg-green-100 transition"
          >
            Sign up with Google <FcGoogle size={20} />
          </button>
        </form>

         <div className="text-center mt-4">
            <span className="text-sm text-gray-700">Already have an account?</span>{' '}
            <Link to="/login" className="text-blue-800 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Register;
