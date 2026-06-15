"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fmtINR } from "@/lib/utils";

interface WeeklyRevenueChartProps {
  data: { week: string; revenue: number }[];
}

export default function WeeklyRevenueChart({ data }: WeeklyRevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
        <Tooltip
          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }}
          formatter={(v: number) => fmtINR(v)}
        />
        <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
