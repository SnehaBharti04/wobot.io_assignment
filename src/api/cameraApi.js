import axios from "axios";

const TOKEN = import.meta.env.VITE_API_TOKEN;

const client = axios.create({
  baseURL: "https://hiring-assignment.wobot.ai/api/v1",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchCameras = async () => {
    const res = await client.get("/fetch/cameras");
    return res;
  };
  

export const updateStatus = async (id, status) => {
  return await client.post("/update/camera/status", { id, status });
};
