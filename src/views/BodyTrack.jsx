import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { handleFormSubmit } from '../presenter/BodyTrackPresenter';

const BodyTrack = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    activityLevel: 1,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActivityChange = (e) => {
    setFormData({ ...formData, activityLevel: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formData, setLoading, setResult); // Gunakan Presenter
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#A6E3E8] mt-14 py-6 px-4">
        <h1 className="text-2xl font-extrabold text-center mt-4 mb-2 text-black">LACAK BODYTRACK ANDA DISINI</h1>
        <p className="text-center font-bold text-sm text-black max-w-xl mx-auto mb-2">
          Masukkan data tubuhmu seperti berat badan, tinggi badan, usia, dan jenis kelamin untuk mengetahui status kesehatanmu — apakah kamu berada dalam kategori ideal, underweight, overweight, atau obesitas.
        </p>
        <p className="text-center text-sm text-gray-600 mb-6">
          Dari sini, kamu bisa mulai perjalanan menuju tubuh yang lebih sehat dan seimbang!
        </p>

        <div className="min-h-screen bg-[#A6E3E8] flex items-center justify-center py-12">
          <div className="bg-white max-w-xl w-full p-8 rounded-3xl shadow-lg">
            <h2 className="text-center text-2xl font-semibold mb-6 text-[#2F4F4F]">Masukkan Data Body Track Anda</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm text-gray-700">
              {/* Umur */}
              <div className="flex flex-col">
                <label htmlFor="age" className="mb-1 font-medium">Umur</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Masukkan umur"
                  value={formData.age}
                  onChange={handleChange}
                  className="bg-[#DDF7FA] p-2 rounded-md focus:outline-none"
                />
              </div>

              {/* Tinggi Badan */}
              <div className="flex flex-col">
                <label htmlFor="height" className="mb-1 font-medium">Tinggi Badan (cm)</label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  placeholder="Masukkan tinggi badan"
                  value={formData.height}
                  onChange={handleChange}
                  className="bg-[#DDF7FA] p-2 rounded-md focus:outline-none"
                />
              </div>

              {/* Berat Badan */}
              <div className="flex flex-col">
                <label htmlFor="weight" className="mb-1 font-medium">Berat Badan (kg)</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="Masukkan berat badan"
                  value={formData.weight}
                  onChange={handleChange}
                  className="bg-[#DDF7FA] p-2 rounded-md focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-1 font-medium">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-[#DDF7FA] p-2 rounded-md focus:outline-none"
                >
                  <option value="">Pilih Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-center font-medium text-sm mb-1 mt-3">Level Aktifitas</label>
                <input
                  type="range"
                  name="activityLevel"
                  min="1"
                  max="4"
                  value={formData.activityLevel}
                  onChange={handleActivityChange}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div className="bg-[#DDF7FA] border border-[#BEE3E8] p-4 text-sm rounded-md">
                <p className="mb-2 font-medium text-center">Panduan Pemilihan Level Aktivitas</p>
                <ul className="list-decimal list-inside space-y-1 text-justify">
                  <li>Level 1 = Aktivitas fisik sangat rendah (gaya hidup sangat sedentari, jarang bergerak)</li>
                  <li>Level 2 = Aktivitas fisik rendah (sedikit bergerak, aktivitas ringan)</li>
                  <li>Level 3 = Aktivitas fisik sedang (olahraga ringan–sedang beberapa kali seminggu)</li>
                  <li>Level 4 = Aktivitas fisik tinggi (rutin berolahraga intens atau pekerjaan fisik berat)</li>
                </ul>
              </div>

              <button
                type="submit"
                className="bg-[#215732] hover:bg-[#1b4728] text-white font-semibold py-2 rounded-md disabled:opacity-70"
                disabled={loading} // 👈 Disable saat loading
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md shadow-inner mt-6 max-w-xl mx-auto min-h-[100px]">
          <h3 className="font-semibold text-teal-800 text-lg mb-2">Result</h3>
          {result ? (
            <>
              <p className="text-sm mb-2">
                Hasil Deteksi: <span className="font-semibold">{result.predictedLabel}</span>
              </p>

              {result.predictedLabel === "Obese" && (
                <p className="text-sm text-red-700">
                  Saran: Disarankan untuk rutin berolahraga minimal 30 menit per hari, menghindari makanan tinggi lemak dan gula, serta konsultasi dengan ahli gizi untuk pola makan sehat.
                </p>
              )}

              {result.predictedLabel === "Overweight" && (
                <p className="text-sm text-orange-700">
                  Saran: Mulailah meningkatkan aktivitas fisik, seperti berjalan kaki atau bersepeda, serta kurangi konsumsi makanan cepat saji dan minuman manis.
                </p>
              )}

              {result.predictedLabel === "Underweight" && (
                <p className="text-sm text-yellow-700">
                  Saran: Tingkatkan asupan kalori sehat, konsumsi makanan kaya protein dan karbohidrat kompleks, serta periksa kemungkinan kondisi medis tertentu.
                </p>
              )}

              {result.predictedLabel === "Normal weight" && (
                <p className="text-sm text-green-700">
                  Saran: Pertahankan pola makan bergizi seimbang dan gaya hidup aktif agar kesehatan tetap terjaga.
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm italic">
              Hasil akan ditampilkan di sini setelah kamu submit.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BodyTrack;
