import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, MenuItem, Select } from "@mui/material";
import { data } from "../assets/sales_time";

const OverviewChart = ({ data2 }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Manual Brew");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const aggregatedData = useMemo(() => {
    if (!data) return [];

    // Log initial data for debugging
    console.log("Initial data:", data);

    // Aggregate data based on timestamp
    const sumsByTimestamp = {};
    data.forEach((item) => {
      const timestamp = item.Timestamp;
      const total = parseFloat(item["Final Total"]);
      if (!sumsByTimestamp[timestamp]) {
        sumsByTimestamp[timestamp] = 0;
      }
      sumsByTimestamp[timestamp] += total;
    });

    // Convert aggregated data to an array of objects with 'x' and 'y' properties
    const aggregatedArray = Object.keys(sumsByTimestamp).map((timestamp) => ({
      x: timestamp,
      y: sumsByTimestamp[timestamp],
    }));

    // Log aggregated data for debugging
    console.log("Aggregated data:", aggregatedArray);

    return aggregatedArray;
  }, [data]);

  console.log("Aggregated data:", aggregatedData);

  return (
    <>
      <Select
        sx={{
          padding: "0px",
          width: "20%",
          height: "15%",
          marginBottom: "20px",
        }}
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
        inputProps={{ "aria-label": "Select Category" }}
      >
        <MenuItem value="" disabled>
          Select Category
        </MenuItem>
        {[
          "Manual Brew",
          "Cold Coffee",
          "Extra Toppings",
          "Food Menu",
          "Hot Coffee",
          "Hot Chocolate",
          "Milk",
          "Savouries",
        ].map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <ResponsiveLine
        data={[{ id: selectedCategory, data: aggregatedData }]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 8, right: 100, bottom: 95, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="linear"
        axisBottom={{
          legend: "Timestamp",
          legendOffset: 36,
          legendPosition: "middle",
          tickRotation: -45,
        }}
        axisLeft={{
          legend: "Sum",
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: "nivo" }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </>
  );
};

export default OverviewChart;

// import React, { useMemo, useState } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { useTheme, MenuItem, Select } from "@mui/material";
// // import { data } from "./cmo_msp_mandi";
// import {data } from "../assets/sales_time.js"

// const OverviewChart = ({ data2 }) => {
//   const theme = useTheme();
//   const [selectedCommodity, setSelectedCommodity] = useState("Manual Brew");

//   const handleCommodityChange = (event) => {
//     setSelectedCommodity(event.target.value);
//   };

//   const filteredData = useMemo(() => {
//     if (!data) return [];

//     // Filter data based on selected commodity
//     console.log("Selected commodity:", selectedCommodity);
//     return data.filter((item) => item.commodity === selectedCommodity);
//   }, [data, selectedCommodity]);

//   const chartData = useMemo(() => {
//     if (!filteredData) return [];

//     return filteredData.map((item) => ({
//       x: item.year,
//       y: item.msprice,
//     }));
//   }, [filteredData]);

//   console.log("Filtered data:", filteredData);
//   console.log("Chart data:", chartData);

//   return (
//     <>
//       <Select
//         sx={{
//           padding: "0px",
//           width: "20%",
//           height: "15%",
//           marginBottom: "20px",
//         }}
//         value={selectedCommodity}
//         onChange={handleCommodityChange}
//         displayEmpty
//         inputProps={{ "aria-label": "Select Commodity" }}
//       >
//         <MenuItem value="" disabled>
//           Select Commodity
//         </MenuItem>
//         {[
//           "Manual Brew",
//           "Cold Coffee",
//           "Extra Toppings",
//           "Food Menu",
//           "Hot Coffee",
//           "Hot Chocolate",
//           "Milk",
//           "Savouries",
//         ].map((commodity) => (
//           <MenuItem key={commodity} value={commodity}>
//             {commodity}
//           </MenuItem>
//         ))}
//       </Select>
//       <ResponsiveLine
//         data={[{ id: selectedCommodity, data: chartData }]}
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: theme.palette.secondary[200],
//               },
//             },
//             legend: {
//               text: {
//                 fill: theme.palette.secondary[200],
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: theme.palette.secondary[200],
//                 strokeWidth: 1,
//               },
//               text: {
//                 fill: theme.palette.secondary[200],
//               },
//             },
//           },
//           legends: {
//             text: {
//               fill: theme.palette.secondary[200],
//             },
//           },
//           tooltip: {
//             container: {
//               color: theme.palette.primary.main,
//             },
//           },
//         }}
//         margin={{ top: 10, right: 50, bottom: 100, left: 70 }}
//         xScale={{ type: "linear", min: "auto", max: "auto" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: false,
//           reverse: false,
//         }}
//         curve="cardinal"
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Year",
//           legendPosition: "middle",
//           legendOffset: 36,
//         }}
//         axisLeft={{
//           tickValues: 5,
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "MS Price",
//           legendPosition: "middle",
//           legendOffset: -60,
//         }}
//         enableGridX={false}
//         enableGridY={false}
//         colors={{ scheme: "nivo" }}
//         lineWidth={2}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//       />
//     </>
//   );
// };

// export default OverviewChart;

// // import React, { useMemo } from "react";
// // import { ResponsiveLine } from "@nivo/line";
// // import { useTheme } from "@mui/material";
// // import { data } from "./cmo_msp_mandi";

// // const OverviewChart = ({ data2 }) => {
// //   const theme = useTheme();

// //   const filteredData = useMemo(() => {
// //     if (!data) return [];

// //     // Filter data for commodity "SUGAR-CANE"
// //     return data.filter((item) => item.commodity === "SUGAR-CANE");
// //   }, [data]);

// //   const chartData = useMemo(() => {
// //     if (!filteredData) return [];

// //     return filteredData.map((item) => ({
// //       x: item.year,
// //       y: item.msprice,
// //     }));
// //   }, [filteredData]);

// //   return (
// //     <ResponsiveLine
// //       data={[{ id: "SUGAR-CANE", data: chartData }]}
// //       theme={{
// //         axis: {
// //           domain: {
// //             line: {
// //               stroke: theme.palette.secondary[200],
// //             },
// //           },
// //           legend: {
// //             text: {
// //               fill: theme.palette.secondary[200],
// //             },
// //           },
// //           ticks: {
// //             line: {
// //               stroke: theme.palette.secondary[200],
// //               strokeWidth: 1,
// //             },
// //             text: {
// //               fill: theme.palette.secondary[200],
// //             },
// //           },
// //         },
// //         legends: {
// //           text: {
// //             fill: theme.palette.secondary[200],
// //           },
// //         },
// //         tooltip: {
// //           container: {
// //             color: theme.palette.primary.main,
// //           },
// //         },
// //       }}
// //       margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
// //       xScale={{ type: "linear", min: "auto", max: "auto" }}
// //       yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
// //       curve="cardinal"
// //       axisBottom={{
// //         tickSize: 5,
// //         tickPadding: 5,
// //         tickRotation: 0,
// //         legend: "Year",
// //         legendPosition: "middle",
// //         legendOffset: 36,
// //       }}
// //       axisLeft={{
// //         tickValues: 5,
// //         tickSize: 5,
// //         tickPadding: 5,
// //         tickRotation: 0,
// //         legend: "MS Price",
// //         legendPosition: "middle",
// //         legendOffset: -60,
// //       }}
// //       enableGridX={false}
// //       enableGridY={false}
// //       colors={{ scheme: "nivo" }}
// //       lineWidth={2}
// //       pointSize={10}
// //       pointColor={{ theme: "background" }}
// //       pointBorderWidth={2}
// //       pointBorderColor={{ from: "serieColor" }}
// //       pointLabelYOffset={-12}
// //       useMesh={true}
// //     />
// //   );
// // };

// // export default OverviewChart;
