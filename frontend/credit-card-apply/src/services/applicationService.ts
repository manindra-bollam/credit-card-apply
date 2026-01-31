import api from "./api";
import type {
  ApplyCardRequest,
  LoginRequest,
  AuthResponse,
  ApplicationStatusResponse,
} from "../models/api";
import type { AxiosResponse } from "axios";

/* APPLY CARD */
export const applyCard = (
  data: ApplyCardRequest
): Promise<AxiosResponse<void>> => {
  return api.post("api/apply", data);
};

/* LOGIN */
export const loginUser = (
  data: LoginRequest
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post("api/login", data);
};

/* GET STATUS */
export const getStatus = (
  id: string
): Promise<AxiosResponse<ApplicationStatusResponse>> => {
  return api.get(`api/application/${id}`);
};

/* UPLOAD PROOF */
export const uploadProof = (file: File): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
