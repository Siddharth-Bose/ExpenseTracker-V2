import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./CustomPiChart.css";

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

function CustomPiChart({ data }) {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="custom-pie-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="pieChart">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

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
        {data.map((entry, index) => {
          return (
            <div
              key={`${index}-${entry.id}`}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "0.5em",
              }}
            >
              <div
                style={{
                  background: COLORS[index % COLORS.length],
                  width: "1em",
                  height: "1em",
                }}
              ></div>
              <div>{entry.category || "No Category"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomPiChart;
