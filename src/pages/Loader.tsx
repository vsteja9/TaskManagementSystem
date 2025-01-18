import { Box, CircularProgress,  Typography } from "@mui/material"; 

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        zIndex: 1000,
        height: 150,
        width: 230,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: "40%",
        backgroundColor: "white",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          size="3rem"
          sx={{
            display: "flex",
            margin: "auto",
            height: 250,
            width: 300,
          }}
        />
        <Typography>Loading</Typography>
      </Box>
    </Box>
  );
}
