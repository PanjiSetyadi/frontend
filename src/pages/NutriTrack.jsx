import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NutriTrackModel from "../models/nutritrackModel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NutriTrackPresenter from "../presenter/NutritrackPresenter";

const NutriTrack = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [inputFood, setInputFood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setInputFood(null);
    setRecommendations([]);

    try {
      const result = await NutriTrackModel.getRecommendation(searchQuery.trim());

      if (!result || result.status !== "success") {
        throw new Error("Data tidak valid");
      }

      setInputFood(result.input_food || null);
      setRecommendations(Array.isArray(result.recommendations) ? result.recommendations : []);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const allFoods = [inputFood, ...recommendations].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-[#A6E3E8]">
      <Navbar />

      <main className="flex-grow pt-24 px-4">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">
            TRACK YOUR NUTRITION
          </h1>

          <div className="max-w-xl mx-auto relative mb-8">
            <input
              type="text"
              placeholder="Type the food name to see its nutritional info"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full py-3 px-5 rounded-full shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              aria-label="Search food nutrition"
            />
            <button
              onClick={handleSearch}
              aria-label="Search button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-extrabold text-black">YOUR RECOMMENDATION</h2>
        </section>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto">
          {loading && (
            <p className="text-center text-green-700 font-semibold">Loading...</p>
          )}
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}

          {!loading && !error && allFoods.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {allFoods.map((food, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center text-center transition duration-300 hover:shadow-xl"
                >
                  <div className="w-full h-36 bg-gray-100 overflow-hidden">
                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Tidak ada gambar
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow w-full">
                    <h3 className="text-base font-semibold text-green-800 mb-2">
                      {food.name || "Nama tidak tersedia"}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1 text-left mb-4">
                      <li>Kalori: {food.calories ?? "-"} kkal</li>
                      <li>Protein: {food.proteins ?? "-"} g</li>
                      <li>Lemak: {food.fat ?? "-"} g</li>
                      <li>Karbohidrat: {food.carbohydrate ?? "-"} g</li>
                    </ul>
                    <button
                      className="bg-green-700 text-white py-2 rounded-full hover:bg-green-800 text-sm w-full"
                      onClick={() =>
                        NutriTrackPresenter.handleSeeMore(navigate, food)
                      }
                      aria-label={`Lihat detail ${food.name}`}
                    >
                      Selengkapnya &raquo;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && allFoods.length === 0 && (
            <p className="text-center text-gray-700">
              Tidak ada data makanan yang ditemukan. Silakan coba pencarian lain.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NutriTrack;
