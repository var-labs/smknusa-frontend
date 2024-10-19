import { axiosInstance } from "@/utils/axiosInstance";

export async function getAlerts() {
  try {
    const response = await axiosInstance.get("api/user/link/alerts");
    const data = response.data.data;

    return data;
  } catch (error) {
    console.log(error, "Error fetching Alert");
    return null;
  }
}