import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NutriTrackPresenter from "../presenter/NutritrackPresenter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NutriTrack = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputFood, setInputFood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    NutriTrackPresenter.handleSearchFood(searchQuery, {
      setLoading,
      setError,
      setInputFood,
      setRecommendations,
    });
  };

  const allFoods = [inputFood, ...recommendations].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-[#A6E3E8]">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
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
            YOUR RECOMMENDATION
          </h2>
        </section>

        <section className="max-w-6xl mx-auto">
          {loading && <p className="text-center text-green-700">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {(inputFood || recommendations.some((r) => !r.isSuggestion)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {allFoods
                .filter((food) => !food.isSuggestion)
                .map((food, index) => (
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
                        {food.name}
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-1 text-left mb-4">
                        <li>Kalori: {food.calories} kkal</li>
                        <li>Protein: {food.proteins} g</li>
                        <li>Lemak: {food.fat} g</li>
                        <li>Karbohidrat: {food.carbohydrate} g</li>
                      </ul>
                      <button
                        className="bg-green-700 text-white py-2 rounded-full hover:bg-green-800 text-sm w-full"
                        onClick={() =>
                          navigate("/nutripages", {
                            state: { food },
                          })
                        }
                      >
                        Selengkapnya »
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {!loading && recommendations.length > 0 && !inputFood && (
            <div className="text-center text-sm text-gray-800 mt-4">
              <p className="font-semibold mb-2">Apakah maksud Anda salah satu dari berikut?</p>
              <ul className="inline-block text-left space-y-1">
                {recommendations.map((food, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-green-700 hover:underline"
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
                    {food.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NutriTrack;
