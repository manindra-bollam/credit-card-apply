import api from "./api";

export const applyCard = (data: any) => api.post("/applications", data);

export const loginUser = (data: any) => api.post("/login", data);

export const getStatus = (id: string) => api.get(`/applications/${id}`);

export const uploadProof = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/upload", formData);
};
