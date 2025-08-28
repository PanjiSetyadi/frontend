import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NutriTrackPresenter from "../presenter/NutritrackPresenter";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

const NutriTrack = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputFood, setInputFood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setInputFood(null);
    setRecommendations([]);
    NutriTrackPresenter.handleSearchFood(searchQuery, {
      setLoading,
      setError,
      setInputFood,
      setRecommendations,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#A6E3E8]">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">
            LACAK NUTRISI ANDA
          </h1>

          <div className="max-w-xl mx-auto relative mb-8">
            <input
              type="text"
              placeholder="Ketik nama makanan untuk melihat informasi nutrisi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full py-3 px-5 rounded-full shadow-md text-sm focus:outline-none bg-white text-shadow-gray-600 focus:ring-2 focus:ring-green-600"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700"
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

          <h2 className="text-xl font-extrabold text-black">
            REKOMENDASI ANDA
          </h2>
        </section>

        <section className="max-w-6xl mx-auto">
          {loading && <p className="text-center text-green-700">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {(inputFood || recommendations.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Kiri: Informasi Makanan */}
              {inputFood && (
                <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center text-center transition duration-300 hover:shadow-xl">
                  <div className="w-full h-36 bg-gray-100 overflow-hidden">
                    {inputFood.image ? (
                      <img
                        src={inputFood.image}
                        alt={inputFood.name}
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
                      {inputFood.name}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1 text-left mb-4">
                      <li>Kalori: {inputFood.calories} kkal</li>
                      <li>Protein: {inputFood.proteins} g</li>
                      <li>Lemak: {inputFood.fat} g</li>
                      <li>Karbohidrat: {inputFood.carbohydrate} g</li>
                    </ul>
                    <button
                      className="bg-green-700 text-white py-2 rounded-full hover:bg-green-800 text-sm w-full"
                      onClick={() =>
                        navigate("/nutripages", {
                          state: { food: inputFood },
                        })
                      }
                    >
                      Selengkapnya »
                    </button>
                  </div>
                </div>
              )}

              {/* Kanan: Rekomendasi */}
              {!loading && recommendations.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg text-gray-800">
                  <p className="font-semibold text-center text-base sm:text-lg mb-4">
                    🤔 ini adalah rekomendasi makanan yang memiliki kandungan gizi hampir sama
                  </p>
                  <ul className="space-y-3">
                    {recommendations.map((food, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 cursor-pointer hover:bg-green-50 px-4 py-2 rounded-lg transition"
                        onClick={() => {
                          setSearchQuery(food.name);
                          NutriTrackPresenter.handleSearchFood(food.name, {
                            setLoading,
                            setError,
                            setInputFood,
                            setRecommendations,
                          });
                        }}
                      >
                        <span className="text-green-600 text-lg">🍽️</span>
                        <span className="text-sm sm:text-base text-green-800 hover:underline">
                          {food.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NutriTrack;
