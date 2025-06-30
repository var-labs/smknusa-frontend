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

export async function getElearnDetails(id?: string) {
  try {
    const response = await axiosInstance.get(`/api/user/profile/e-learning/${id}`);
    const data = response.data.List;
    console.log(data, "Elearn Details");
    return data;
  } catch (error) {
    console.log(error, "Error fetching Elearn Details");
    return null;
  }
}
