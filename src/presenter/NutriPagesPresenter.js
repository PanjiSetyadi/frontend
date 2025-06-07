import NutriPagesModel from "../models/NutriPagesModel";

const NutriPagesPresenter = {
  async getRecommendation(foodName) {
    try {
      const result = await NutriPagesModel.fetchRecommendation(foodName);

      if (result.status === "success" && result.food) {
        return result.food; 
      } else {
        throw new Error(result.message || "Data tidak valid");
      }
    } catch (error) {
      console.error("Terjadi kesalahan dalam getRecommendation:", error);
      throw error;
    }
  },
};

export default NutriPagesPresenter;
