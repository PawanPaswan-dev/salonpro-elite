"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PopularServicesChartProps {
  data: { name: string; value: number }[];
}

export default function PopularServicesChart({ data }: PopularServicesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} width={100} />
        <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }} />
        <Bar dataKey="value" fill="#D4AF37" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
