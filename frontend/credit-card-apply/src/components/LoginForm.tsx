import { TextField, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/applicationService";

interface LoginFormData {
  applicantId: string;
  phone: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormData>({
    applicantId: "",
    phone: "",
  });

  const handleChange =
    (field: keyof LoginFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (): Promise<void> => {
    // Send whichever field user entered
    const payload =
      form.applicantId.trim() !== ""
        ? { applicantId: form.applicantId }
        : { phone: form.phone };

    const response = await loginUser(payload);

    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };

  return (
    <Card>
      <CardContent>
        <TextField
          label="Applicant ID"
          fullWidth
          value={form.applicantId}
          onChange={handleChange("applicantId")}
        />

        <TextField
          label="Phone Number"
          fullWidth
          sx={{ mt: 2 }}
          value={form.phone}
          onChange={handleChange("phone")}
        />

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
