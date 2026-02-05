  import axiosInstance from "./axiosInstance";    

  const getOwnWords = async () => {
    try {
      let allWords = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        const response = await axiosInstance.get("/words/own", { params: { page } });
        const data = response.data;
        const results = data.results || [];
        allWords = [...allWords, ...results];
        
        if (page >= (data.totalPages || 1)) {
          hasMore = false;
        }
        page++;
      }
      
      return { results: allWords };
    } catch (error) {
      console.error("Error fetching own words:", error);
      throw error;
    }
  }

 export const getRecommendedWords = async ({ page = 1, keyword = "", category = "",isIrregular }) => {
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
        formattedData.isIrregular = !wordData.isRegular;
      }

      const response = await axiosInstance.put(`/words/update/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error("Error updating word", error);
      throw error;
    }
  };

  export default getOwnWords;