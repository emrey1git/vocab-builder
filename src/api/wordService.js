import axiosInstance from "./axiosInstance";    

const getOwnWords = async () => {
   try {
     const response = await axiosInstance.get("/words/own");
     const words = response.data;
     return words;
   } catch (error) {
     console.error("Error fetching own words:", error);
   }
}

export const getRecommendedWords = async () => {
  try {
    const response = await axiosInstance.get("/words/all");
    return response.data; 
  } catch (error) {
    console.error("Error fetching recommended words:", error);
    throw error;
  }
};

export const addWordToDictionary = async (id) => {
    try {
        const response = await axiosInstance.post(`/words/add/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error adding word to dictionary:", error);
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
export default getOwnWords;