import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';

const Homepage = () => {
  const featuresWhy = [
    {
      img: "/img/img_1.jpg",
      text: 'Banyak orang kesulitan mengatur asupan nutrisi harian secara efektif.',
    },
    {
      img: "/img/img_2.jpg",
      text: 'Informasi gizi pada makanan kemasan sering kali tidak jelas atau membingungkan.',
    },
    {
      img: "/img/img_3.jpg",
      text: 'Sulit menentukan porsi makan yang sesuai dengan tujuan—baik itu menurunkan berat badan, menjaga, atau menambah massa tubuh.',
    }
  ];

  const featuresHow = [
    {
      img: "/img/img_4.jpg",
      text: 'Scan makanan anda lihat apakah makanan tersebut baik untuk anda',
    },
    {
      img: "/img/img_5.jpg",
      text: 'Input data pribadi -> Sistem akan deteksi berat badan anda',
    },
    {
      img: "/img/img_6.jpg",
      text: 'Sistem juga akan merekomendasikan makanan sesuai dengan kebutuhan nutrisi anda',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Konten utama */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="h-[70vh] flex flex-col items-center justify-center bg-[#A6E3E9] text-center px-4 space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            WELCOME TO <span className="text-green-700">NUTRIVISION</span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-black">
            Scan Your Food, Shape Your Health
          </p>
          <blockquote className="text-lg md:text-xl text-black italic max-w-3xl">
            "Every time you eat or drink, you are either feeding disease or fighting it."
            <br />
            <span className="not-italic text-sm md:text-base font-medium block mt-2">
              — Heather Morgan, Nutritionist dan Health Strategist
            </span>
          </blockquote>
        </section>

        {/* Feature Section */}
        <section className="bg-[#A6E3E8] py-4 px-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Mengapa <span className="text-[#85C125]">NUTRIVISION</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mb-12 max-w-6xl mx-auto">
            {featuresWhy.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={item.img}
                  alt={`Illustration Why ${index + 1}`}
                  className="w-48 h-48 object-contain rounded-full mb-6"
                />
                <p className="text-gray-800 text-sm md:text-base max-w-xs">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Bagaimana <span className="text-[#85C125]">NUTRIVISION</span> Membantu kamu?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {featuresHow.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={item.img}
                  alt={`Illustration How ${index + 1}`}
                  className="w-48 h-48 object-contain rounded-full mb-6"
                />
                <p className="text-gray-800 text-sm md:text-base max-w-xs">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Scan CTA Section */}
        <section
          id="scanhome"
          className="min-h-screen flex flex-col items-center justify-center bg-[#A6E3E8] text-center px-4 space-y-20"
        >
          <h1 className="text-4xl md:text-4xl font-extrabold text-black">
            Saatnya Peduli Dengan Apa Yang Kamu Konsumsi
          </h1>
          <Link
            to="/scanner"
            className="bg-[#3A7D44] text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-[#6ca31f] transition duration-200"
          >
            Scan Makananmu Hari Ini
          </Link>
        </section>
      </main>

      {/* Footer di paling bawah */}
      <Footer />
    </div>
  );
};

export default Homepage;
