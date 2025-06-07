const NutriTrackModel = {
  async getRecommendation(foodName) {
    const response = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ food_name: foodName })
    });

    if (!response.ok) {
      const text = await response.text(); // Tangkap teks error dari backend
      throw new Error(text); // Lempar ke presenter
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Response tidak valid dari server");
    }

    return result;
  }
};

export default NutriTrackModel;