export interface ApplyCardRequest {
  fullName: string;
  pan: string;
  phone: string;
  income: number | "";
  profession: string;
  dob: string;
}

export interface LoginRequest {
  applicantId?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
}

export interface ApplicationStatusResponse {
  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";
}
