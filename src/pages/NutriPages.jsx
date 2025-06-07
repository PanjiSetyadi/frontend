import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NutriPages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    image: "",
    calories: null,
    carbohydrate: null,
    fat: null,
    proteins: null,
  });

  useEffect(() => {
    if (location.state && location.state.food) {
      const { name, image, calories, carbohydrate, fat, proteins } = location.state.food;

      setFood({ name, image, calories, carbohydrate, fat, proteins });
    } else {
      navigate(-1);
    }
  }, [location.state, navigate]);

  const renderNutrition = (food) => {
    if (!food) return "Tidak ada data nutrisi tersedia.";

    const nutritionProps = ["calories", "carbohydrate", "fat", "proteins"];

    return (
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {nutritionProps.map((key) => (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {food[key] !== undefined && food[key] !== null ? food[key] : "-"}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-[#A6E3E8] flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-4 py-8 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-xl p-6 shadow-lg border border-green-600">
          <div className="w-full rounded-md mb-6 overflow-hidden flex items-center justify-center bg-white">
            {food.image ? (
              <img
                src={food.image}
                alt={food.name}
                className="w-full max-w-[600px] rounded-md"
                style={{ height: "auto" }}
              />
            ) : (
              <span className="text-gray-500">[ Gambar Makanan Tidak Tersedia ]</span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {food.name || "Nama Makanan"}
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Kandungan Nutrisi:</h3>
          <div className="text-gray-700 text-justify whitespace-pre-line">
            {renderNutrition(food)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutriPages;
