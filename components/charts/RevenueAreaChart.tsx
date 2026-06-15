"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fmtINR } from "@/lib/utils";

interface RevenueAreaChartProps {
  data: { month: string; revenue: number }[];
}

export default function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <YAxis
          stroke="rgba(255,255,255,0.3)"
          fontSize={12}
          tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
        />
        <Tooltip
          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }}
          formatter={(v: number) => fmtINR(v)}
        />
        <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fill="url(#rev)" strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
