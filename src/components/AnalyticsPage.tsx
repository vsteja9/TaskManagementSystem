import { Grid2 } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

export default function AnalyticsPage() {
  const localStorageData = localStorage.getItem("kanban-board");
  let calculatedData: number[] = [];
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    calculatedData = [
      parsedData["Analysis"].items?.length,
      parsedData["InDev"].items?.length,
      parsedData["InQA"].items?.length,
      parsedData["Done"].items?.length,
    ];
  }

  const projectAnalytics: any = [
    [
      { id: 0, value: calculatedData[0], label: "Analysis", color: "#ff9800" },
      { id: 1, value: calculatedData[1], label: "In Dev", color: "#00bcd4" },
      { id: 2, value: calculatedData[2], label: "In QA", color: "#2196f3" },
      { id: 3, value: calculatedData[3], label: "Done", color: "#e91e63" },
    ],
  ];
  return (
    <>
      <Grid2
        display={"flex"}
        alignContent={"center"}
        justifyContent={"space-around"}
      >
        {projectAnalytics.map((obj: any) => (
          <Grid2
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            border={"ActiveBorder"}
            borderRadius={"10px"}
            borderColor={"black"}
          >
            <PieChart
              series={[
                {
                  data: obj,
                },
              ]}
              slotProps={{
                legend: {
                  hidden: false,
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  itemGap: 10,
                  padding: { top: 0 },
                },
              }}
              height={500}
              width={450}
            />
          </Grid2>
        ))}
        <Grid2
          display={"flex"}
          alignContent={"center"}
          justifyContent={"space-around"}
        >
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Analysis", "In Dev", "In QA", "Done"],
              },
            ]}
            series={[{ data: [...calculatedData], color: "#af7aa1" }]}
            width={500}
            height={500}
          />
        </Grid2>
        <Grid2
          display={"flex"}
          alignContent={"center"}
          justifyContent={"space-around"}
        >
          <LineChart
            xAxis={[
              {
                data: ["Analysis", "In Dev", "In QA", "Done"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [...calculatedData],
                color: "#f28e2c",
              },
            ]}
            width={500}
            height={500}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
