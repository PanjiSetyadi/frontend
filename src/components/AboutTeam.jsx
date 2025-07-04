import React from 'react';
import Navbar from './navbar';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import Footer from './Footer';

const teamMembers = [
  {
    name: 'Muhammad Tegar Wijaya',
    role: 'Machine Learning (ML)',
    university: 'Universitas Sahid Surakarta',
    image: "/profil/Muhammad_Tegar_Wijaya.jpeg",
    linkedin: 'https://www.linkedin.com/in/muhamad-tegar-wijaya/',
    instagram: 'https://www.instagram.com/muhamadtegarwijayaa?igsh=YXdqNzdlZjZhMmRx',
  },
  {
    name: 'Rensa Ayu Lestari',
    role: 'Machine Learning (ML)',
    university: 'Universitas Andalas',
    image: "/profil/Rensa_Ayu_Lestari.jpeg",
    linkedin: 'https://www.linkedin.com/in/rensa-ayu-lestari-780287300/',
    instagram: 'https://www.instagram.com/rensaayulestari?igsh=MXY3cDNudXBjejB5eA==',
  },
  {
    name: 'Susi Angelina',
    role: 'Machine Learning (ML)',
    university: 'Universitas Widya Dharma Pontianak',
    image: "profil/Susi_Angelina.jpeg", 
    linkedin: 'https://www.linkedin.com/in/susi-angelina/',
    instagram: 'https://www.instagram.com/03_sus',
  },
  {
    name: 'Panji Setyadi',
    role: 'Front-end & Back-end Engineer (FEBE)',
    university: 'Universitas Sahid Surakarta',
    image: "/profil/Panji_Setyadi.jpeg",
    linkedin: 'https://www.linkedin.com/in/panji-setyadi-b602b7309/',
    instagram: 'https://www.instagram.com/panjisty?igsh=Mm9uNGM0cjFtb3M1',
  },
  {
    name: 'Azizun Fathin Wahyu Lestari',
    role: 'Front-end & Back-end Engineer (FEBE)',
    university: 'Universitas Sahid Surakarta',
    image: "/profil/Azizun_Fathin_Wahyu_Lestari.jpeg",
    linkedin: 'https://www.linkedin.com/in/azizunfathin',
    instagram: 'https://www.instagram.com/zziefathin_',
  },
  {
    name: 'Ririn Nur Fatimah',
    role: 'Front-end & Back-end Engineer (FEBE)',
    university: 'Universitas Sahid Surakarta',
    image: "/profil/Ririn_Nur_Fatimah.jpeg",
    linkedin: 'https://www.linkedin.com/in/ririnnurfatimah',
    instagram: 'https://www.instagram.com/ririnnn.nf',
  },
];

const AboutTeam = () => {
  return (
    <>
      <Navbar />

      <section className="bg-[#A6E3E8] pt-28 pb-12 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">NUTRIVISION TEAM</h2>
          <img src="/LOGO1.png" alt="Nutrivision Logo" className="w-32 mx-auto my-6" />

          <div className="text-gray-800 mb-10 px-2 sm:px-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              About <span className="text-green-600">NUTRIVISION</span> Team
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Kami adalah bagian dari <strong>Program Coding Camp 2025 by DBS Foundation</strong>, tim CC25-CF220 yang terdiri dari mahasiswa dari berbagai universitas di Indonesia. Kami mengembangkan proyek <strong>Nutrivision</strong> – <em>Scan Your Food, Shape Your Health</em> sebagai bentuk kontribusi dalam menciptakan solusi digital untuk hidup yang lebih sehat. Tim kami terdiri dari divisi <strong>Machine Learning (ML)</strong> dan <strong>Frontend–Backend Engineering (FEBE)</strong>, yang bekerja sama mengembangkan platform cerdas untuk membantu pengguna memahami dan mengelola asupan nutrisi mereka secara praktis dan personal.
            </p>
          </div>

          <h3 className="text-xl font-bold text-green-700 mb-8">
            Meet Our <span className="text-green-500">NUTRIVISION</span> Team
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center">
                <h4 className="text-green-600 font-semibold text-sm mb-2">NUTRIVISION TEAM</h4>
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-2 border-green-500"
                  style={{ imageRendering: 'auto' }}
                />
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-gray-700">{member.role}</p>
                <p className="text-sm text-gray-500 mb-3">{member.university}</p>
                <div className="flex space-x-4 mt-auto">
                  <a
                    href={member.linkedin || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-green-600 hover:text-green-800 text-xl" />
                  </a>
                  <a
                    href={member.instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-green-600 hover:text-green-800 text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutTeam;
