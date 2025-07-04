// src/models/bodyTrackModel.js
import axios from 'axios';

export const predictBodyStatus = async (parsedData) => {
  try {
    const response = await axios.post('https://web-production-165e2.up.railway.app/predict', parsedData);
    return {
      success: true,
      data: {
        predictedLabel: response.data.predicted_label,
        predictedClass: response.data.predicted_class,
      },
    };
  } catch (error) {
    console.error('Model Error:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan saat memproses data',
    };
  }
};
