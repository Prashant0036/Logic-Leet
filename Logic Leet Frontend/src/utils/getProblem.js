import axiosClient from "./axiosClient";

async function getProblem(problemId){


 try {
   
   
        const  response  = await axiosClient.get(`/problem/problemForAdmin/${problemId}`);
       
     

    // Return only useful data, not the whole axios response
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching problem data:", err);

    // Normalize error handling
    if (err.response) {
      throw new Error(err.response.data?.message || "API Error");
    }

    throw new Error("Network error");
  }

}

export default getProblem;