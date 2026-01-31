import ApplyForm from "../components/ApplyForm";
import Header from "../components/Header";
import {
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
  Stack,
} from "@mui/material";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        component="main"
        aria-label="Credit Card Portal"
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.grey[100],
          py: { xs: 3, md: 6 },
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* FORMS CONTAINER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {/* APPLY CARD */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              flex: 1,
              maxWidth: 520,
              order: { xs: 2, md: 1 }, // mobile bottom
            }}
            aria-labelledby="apply-title"
          >
            <Typography
              id="apply-title"
              variant="h6"
              fontWeight={500}
              mb={2}
              component="h2"
            >
              New Credit Card Application
            </Typography>

            <ApplyForm />
          </Paper>
        </Box>

        {/* FOOTER */}
        <Stack spacing={1} textAlign="center" mt={{ xs: 4, md: 6 }}>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            Secure • Fast • Paperless Processing
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
