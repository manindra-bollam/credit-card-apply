import { TextField, Button, Card, CardContent, Stack } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { applyCard } from "../services/applicationService";
import type { ApplyFormData } from "../models/ApplyForm";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const ApplyForm = () => {
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [dobError, setDobError] = useState("");

  const [form, setForm] = useState<ApplyFormData>({
    fullName: "",
    pan: "",
    phone: "",
    income: "",
    profession: "",
    dob: "",
  });

  const handleChange =
    (field: keyof ApplyFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "income" ? Number(event.target.value) : event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleDobChange = (newValue: Dayjs | null) => {
    setDob(newValue);

    if (!newValue) {
      setDobError("Date of birth is required");
      setForm((prev) => ({ ...prev, dob: "" }));
      return;
    }

    const age = dayjs().diff(newValue, "year");

    if (age < 18) {
      setDobError("You must be at least 18 years old");
      setForm((prev) => ({ ...prev, dob: "" }));
    } else {
      setDobError("");
      setForm((prev) => ({
        ...prev,
        dob: newValue.format("YYYY-MM-DD"),
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (dobError || !form.dob) {
      alert("Please select a valid Date of Birth");
      return;
    }

    await applyCard(form);
    alert("Application Submitted");
  };

  return (
    <Card>
      <CardContent>
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

          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={handleDobChange}
            disableFuture
            maxDate={dayjs().subtract(18, "year")}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(dobError),
                helperText: dobError || "Select your DOB",
              },
            }}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Apply
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ApplyForm;
