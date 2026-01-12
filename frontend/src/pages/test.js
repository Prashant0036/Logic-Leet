import axiosClient from "../utils/axiosClient.js"

async function main(problemId) {
        const response = await axiosClient.get(`/problem/${problemId}`);
    console.log(response);
}

main("6926be956839e104030ffe55");
