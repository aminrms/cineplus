import axios from "axios";
export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api", timeout: 10000 });
apiClient.interceptors.response.use((r) => r, (e) => Promise.reject(e));
