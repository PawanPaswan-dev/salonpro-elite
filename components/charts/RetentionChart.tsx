"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RetentionChartProps {
  data: { month: string; retention: number }[];
}

export default function RetentionChart({ data }: RetentionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="ret" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} domain={[70, 95]} />
        <Tooltip
          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }}
          formatter={(v: number) => `${v}%`}
        />
        <Area type="monotone" dataKey="retention" stroke="#D4AF37" fill="url(#ret)" strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
