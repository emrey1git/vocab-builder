import axiosInstance from "./axiosInstance";

const getOwnWords = async ({ page = 1, keyword = "", category = "" } = {}) => {
  try {
    const response = await axiosInstance.get("/words/own", {
      params: { 
        page, 
        keyword, 
        category 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching own words:", error);
    throw error;
  }
};

export const getRecommendedWords = async ({ page = 1, keyword = "", category = "", isIrregular }) => {
  try {
    const response = await axiosInstance.get("/words/all", {
      params: { 
        page, 
        keyword, 
        category,
        isIrregular
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended words:", error);
    throw error;
  }
};

export const addWordToDictionary = async (id) => {
  try {
    const response = await axiosInstance.post(`/words/add/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding word to dictionary:", error);
    throw error;
  }
};

export const getStatistics = async () =>{
  try {
    const response = await axiosInstance.get("/words/statistics");  return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
    
  }
}
export const deleteWordFromServer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/words/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting word:", error);
    throw error;
  }
};

export const getTrainingWords = async () => {
  try {
    const response = await axiosInstance.get("/words/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching training tasks:", error);
    throw error;
  }
};
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/users/current");
    return response.data;
  } catch (error) {
    console.error("User info error:", error);
    throw error;
  }
};
export const createNewWord = async (wordData) => {
  try {
    const formattedData = {
      en: wordData.en,
      ua: wordData.ua,
      category: wordData.category,
    };

    if (wordData.category === "verb") {
      formattedData.isIrregular = !wordData.isRegular;
    }

    const response = await axiosInstance.post("/words/create", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error creating word", error);
    throw error;
  }
};

export const updateWord = async (id, wordData) => {
  try {
    const formattedData = {
      en: wordData.en,
      ua: wordData.ua,
      category: wordData.category,
    };

    if (wordData.category === "verb") {
      formattedData.isIrregular = wordData.isRegular === false;
    }

    const response = await axiosInstance.patch(`/words/edit/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error updating word", error);
    throw error;
  }
};

export default getOwnWords;