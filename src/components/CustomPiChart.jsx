import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./CustomPiChart.css";

// Color Scheme
const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

function CustomPiChart({ data }) {
  // Constant to convert degrees to radians
  const RADIAN = Math.PI / 180;

  // Function to render customized label inside the pie chart slices
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    // Calculate the position of the label on the pie slice
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      // Label showing the percentage inside the pie slice
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"} // Position label based on slice's position
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`} {/* Display percentage */}
      </text>
    );
  };

  return (
    <div className="custom-pie-container">
      {/* Responsive container ensures the pie chart fits within its container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="pieChart">
          <Pie
            data={data} // Data for the pie chart
            cx="50%" // Center the pie chart horizontally
            cy="50%" // Center the pie chart vertically
            labelLine={false} // Disable lines from the label to the slices
            label={renderCustomizedLabel} // Custom label rendering
            outerRadius="80%" // Define the outer radius of the pie chart
            fill="#8884d8" // Default color for the pie slices
            dataKey="value" // Key to access the data values
          >
            {/* Render each slice with a different color */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`} // Unique key for each slice
                fill={COLORS[index % COLORS.length]} // Cycle through the colors array
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Display the legend outside the pie chart */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
          flexWrap: "wrap",
          minWidth: "400px",
        }}
      >
        {/* Loop through the data to display each category's color and name */}
        {data.map((entry, index) => {
          return (
            <div
              key={`${index}-${entry.id}`} // Unique key for each legend item
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "0.5em",
              }}
            >
              {/* Color square for the legend */}
              <div
                style={{
                  background: COLORS[index % COLORS.length], // Use color from COLORS array
                  width: "1em",
                  height: "1em",
                }}
              ></div>
              {/* Display category name, or default text if not available */}
              <div>{entry.category || "No Category"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomPiChart;
