import NutriTrackModel from "../models/nutritrackModel";

const NutriTrackPresenter = {
  async getFoodRecommendations(inputFoodData, setLoading, setRecommendations, setError) {
    console.log("Presenter dipanggil dengan:", inputFoodData);

    setLoading(true);
    setError(null);

    try {
      const result = await NutriTrackModel.getRecommendation(inputFoodData);
      console.log("Respon dari API:", result);

      if (
        !result ||
        !Array.isArray(result.recommendations) ||
        result.recommendations.length === 0
      ) {
        throw new Error("Format data rekomendasi tidak valid atau kosong");
      }

      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Error saat mengambil rekomendasi:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil rekomendasi");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  },

  handleSeeMore(navigate, food) {
    if (!food) return;

    console.log("Navigasi ke detail makanan dengan:", food);

    navigate("/NutriPages", {
      state: {
        food: {
          name: food.name || "",
          image: food.image || "",
          calories: food.calories || null,
          carbohydrate: food.carbohydrate || null,
          fat: food.fat || null,
          proteins: food.proteins || null,
        },
      },
    });
  },
};

export default NutriTrackPresenter;
