import {
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { applyCard } from "../services/applicationService";
import type { ApplyFormData } from "../models/ApplyForm";

const ApplyForm = () => {
  const [form, setForm] = useState<ApplyFormData>({
    fullName: "",
    pan: "",
    phone: "",
    income: "",
    profession: "",
    age: "",
  });

  const handleChange =
    (field: keyof ApplyFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "income" || field === "age"
          ? Number(event.target.value)
          : event.target.value;

      setForm({
        ...form,
        [field]: value,
      });
    };

  const handleSubmit = async (): Promise<void> => {
    await applyCard(form);
    alert("Application Submitted");
  };

  const ageOptions = Array.from({ length: 43 }, (_, i) => i + 18); // 18–60

  return (
    <Card>
      <CardContent>
        {/* Stack just for spacing — not layout grid */}
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            fullWidth
            value={form.fullName}
            onChange={handleChange("fullName")}
          />

          <TextField
            label="PAN Number"
            fullWidth
            value={form.pan}
            onChange={handleChange("pan")}
          />

          <TextField
            label="Phone Number"
            fullWidth
            value={form.phone}
            onChange={handleChange("phone")}
          />

          <TextField
            label="Annual Income"
            type="number"
            fullWidth
            value={form.income}
            onChange={handleChange("income")}
          />

          <TextField
            label="Profession"
            fullWidth
            value={form.profession}
            onChange={handleChange("profession")}
          />

          {/* AGE SELECT */}
          <TextField
            select
            label="Age"
            fullWidth
            value={form.age}
            onChange={handleChange("age")}
          >
            {ageOptions.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Apply
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ApplyForm;
