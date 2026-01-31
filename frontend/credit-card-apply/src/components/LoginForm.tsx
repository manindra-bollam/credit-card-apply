import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/applicationService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface LoginFormData {
  applicantId: string;
  phone: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormData>({
    applicantId: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Send whichever field user entered
      const payload = form.applicantId.trim() !== "" ? { applicantId: form.applicantId, password: form.password } : { phone: form.phone, password: form.password };
      const response = await loginUser(payload);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data) {
        setError((err.response as { data: { error: string } }).data.error || "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ minWidth: 340, maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} mb={2} align="center">
            Login to Your Account
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              label="Applicant ID"
              fullWidth
              margin="normal"
              value={form.applicantId}
              onChange={handleChange("applicantId")}
              autoFocus
              autoComplete="username"
            />
            <Typography align="center" color="text.secondary" variant="caption" mb={1}>
              or
            </Typography>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={form.phone}
              onChange={handleChange("phone")}
              autoComplete="tel"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" variant="body2" mt={1} align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
