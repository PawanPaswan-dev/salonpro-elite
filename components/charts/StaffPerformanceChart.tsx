"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fmtINR } from "@/lib/utils";

interface StaffPerformanceChartProps {
  data: { name: string; revenue: number }[];
}

export default function StaffPerformanceChart({ data }: StaffPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} />
        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
        <Tooltip
          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }}
          formatter={(v: number) => fmtINR(v)}
        />
        <Bar dataKey="revenue" fill="#D4AF37" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
