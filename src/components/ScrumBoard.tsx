import { Container, Grid2, Paper, Typography } from "@mui/material";

export default function ScrumBoard() {
  return (
    <Container>
      <Grid2 container spacing={3}>
        <Grid2>
          <Paper>
            <Typography variant="h6">Analysis</Typography>
          </Paper>
        </Grid2>
        <Grid2>
          <Paper>
            <Typography variant="h6">In Dev</Typography>
          </Paper>
        </Grid2>
        <Grid2>
          <Paper>
            <Typography variant="h6">In QA</Typography>
          </Paper>
        </Grid2>
        <Grid2>
          <Paper>
            <Typography variant="h6">Done</Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
