"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", sales: 200 },
  { day: "Tue", sales: 400 },
  { day: "Wed", sales: 300 },
  { day: "Thu", sales: 600 },
];

export default function SalesChart() {
  return (
    <div className="p-6 border rounded mt-6">
      <h2 className="text-lg font-bold mb-4">Sales Overview</h2>

      <LineChart width={400} height={250} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" />
      </LineChart>
    </div>
  );
}
