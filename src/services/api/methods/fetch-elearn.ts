import { axiosInstance } from "@/utils/axiosInstance";

export async function getElearn() {
  try {
    const response = await axiosInstance.get("/api/user/profile/e-learning");
    const data = response.data.List;
    return data;
  } catch (error) {
    console.log(error, "Error fetching Excellences");
    return null;
  }
}
