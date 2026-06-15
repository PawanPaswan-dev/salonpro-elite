"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CustomerGrowthChartProps {
  data: { month: string; customers: number }[];
}

export default function CustomerGrowthChart({ data }: CustomerGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }} />
        <Line type="monotone" dataKey="customers" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
