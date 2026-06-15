"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PIE_COLORS } from "@/data/demoData";

interface ServicePopularityChartProps {
  data: { name: string; value: number }[];
}

export default function ServicePopularityChart({ data }: ServicePopularityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }} />
        <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}
