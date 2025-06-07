const NutriTrackModel = {
  async getRecommendation(inputFoodData) {
    const response = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFoodData),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari server");
    }

    return await response.json();
  },
};

export default NutriTrackModel;
