import axiosClient from "./axiosClient";

async function getVideoData(problemId) {
  try {
   
   
        const  response  = await axiosClient.get(`/video/${problemId}`);
       
     

    // Return only useful data, not the whole axios response
    return response.data;
  } catch (err) {
    console.error("Error fetching video data:", err);

    // Normalize error handling
    if (err.response) {
      throw new Error(err.response.data?.message || "API Error");
    }

    throw new Error("Network error");
  }
}

export default getVideoData;
