import ApplyForm from "../components/ApplyForm";
import LoginForm from "../components/LoginForm";
import { Box, Typography, Paper, Divider, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

const Home = () => {
  const theme = useTheme();

  return (
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
      {/* HEADER */}
      <Box textAlign="center" mb={{ xs: 3, md: 5 }}>
        <Typography variant="h4" fontWeight={600} component="h1" gutterBottom>
          Credit Card Application Portal
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth={500}
          mx="auto"
        >
          Apply for a new credit card or track your existing application
        </Typography>
      </Box>

      {/* MAIN GRID */}
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        justifyContent="center"
        role="region"
        aria-label="Application Options"
      >
        {/* LOGIN */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
            aria-labelledby="login-title"
          >
            <Typography
              id="login-title"
              variant="h6"
              fontWeight={500}
              mb={2}
              component="h2"
            >
              Existing Applicant Login
            </Typography>
            <LoginForm />
          </Paper>
        </Grid>

        {/* APPLY */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
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
        </Grid>
      </Grid>

      {/* FOOTER */}
      <Box textAlign="center" mt={{ xs: 4, md: 6 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption" color="text.secondary">
          Secure • Fast • Paperless Processing
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
