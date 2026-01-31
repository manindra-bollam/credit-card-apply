import React from "react";
import { useUser } from "../context/UserContext";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button
} from "@mui/material";

const Dashboard: React.FC = () => {
  const { user, loading, error, refresh } = useUser();

  // 🔹 Static mock data
  const application = {
    applicationId: "APP-2026-000123",
    status: "Approved"
  };

  const documents = [
    { name: "PAN Card", status: "Verified" },
    { name: "Aadhaar Card", status: "Verified" },
    { name: "Income Proof", status: "Pending" }
  ];

  const creditCards = [
    {
      cardName: "Platinum Credit Card",
      limit: "₹1,00,000",
      validity: "2029"
    },
    {
      cardName: "Gold Credit Card",
      limit: "₹75,000",
      validity: "2028"
    }
  ];

  if (loading) return <Typography>Loading user...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!user) return <Typography>No user data found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* USER INFO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6">Welcome, {user.name} 👋</Typography>
            <Typography color="text.secondary">
              Email: {user.email}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{ width: "fit-content", mt: 1 }}
              onClick={refresh}
            >
              Refresh
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* MAIN SECTIONS */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="stretch"
      >
        {/* APPLICATION */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Application</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>
              <strong>ID:</strong> {application.applicationId}
            </Typography>
            <Chip
              label={application.status}
              color="success"
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>

        {/* DOCUMENTS */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Documents</Typography>
            <Divider sx={{ my: 1 }} />
            <List dense>
              {documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={doc.name}
                    secondary={doc.status}
                  />
                  <Chip
                    label={doc.status}
                    color={doc.status === "Verified" ? "success" : "warning"}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* CREDIT CARDS */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Credit Cards</Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={2}>
              {creditCards.map((card, index) => (
                <Box key={index}>
                  <Typography fontWeight="bold">
                    {card.cardName}
                  </Typography>
                  <Typography variant="body2">
                    Limit: {card.limit}
                  </Typography>
                  <Typography variant="body2">
                    Valid Till: {card.validity}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Dashboard;
