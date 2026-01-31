import { TextField, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { applyCard } from "../services/applicationService";
import type { ApplyFormData } from "../models/ApplyForm";

const ApplyForm = () => {
  const [form, setForm] = useState<ApplyFormData>({
    name: "",
    pan: "",
  });

  const handleChange =
    (field: keyof ApplyFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (): Promise<void> => {
    await applyCard(form);
    alert("Application Submitted");
  };

  return (
    <Card>
      <CardContent>
        <TextField
          label="Name"
          fullWidth
          value={form.name}
          onChange={handleChange("name")}
        />

        <TextField
          label="PAN"
          fullWidth
          sx={{ mt: 2 }}
          value={form.pan}
          onChange={handleChange("pan")}
        />

        <Button sx={{ mt: 2 }} variant="contained" onClick={handleSubmit}>
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplyForm;
