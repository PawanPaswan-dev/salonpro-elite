import { Package, AlertTriangle, X } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import { INVENTORY } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export const metadata = {
  title: "Inventory | SalonPro Elite Owner Dashboard",
};

export default function OwnerInventoryPage() {
  const lowStock = INVENTORY.filter((i) => i.stock <= i.reorder);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Package} label="Total SKUs" value={INVENTORY.length} />
        <StatCard
          icon={AlertTriangle}
          label="Low Stock Items"
          value={INVENTORY.filter((i) => i.stock > 0 && i.stock <= i.reorder).length}
          changeType="down"
        />
        <StatCard icon={X} label="Out of Stock" value={INVENTORY.filter((i) => i.stock === 0).length} changeType="down" />
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Inventory Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-left border-b border-white/10">
                <th className="py-2 font-medium">Product</th>
                <th className="py-2 font-medium">Category</th>
                <th className="py-2 font-medium">Stock</th>
                <th className="py-2 font-medium">Used/Week</th>
                <th className="py-2 font-medium">Unit Price</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY.map((i) => {
                const status = i.stock === 0 ? "Out of Stock" : i.stock <= i.reorder ? "Low Stock" : "In Stock";
                const color =
                  status === "Out of Stock"
                    ? "bg-red-500/10 text-red-400"
                    : status === "Low Stock"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-emerald-500/10 text-emerald-400";
                return (
                  <tr key={i.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 text-white font-medium">{i.name}</td>
                    <td className="py-3 text-white/50">{i.category}</td>
                    <td className="py-3 text-white/70">
                      {i.stock} {i.unit}
                    </td>
                    <td className="py-3 text-white/50">
                      {i.used} {i.unit}
                    </td>
                    <td className="py-3 text-white/70">{fmtINR(i.price)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-yellow-400" /> Reorder Alerts
        </h3>
        <div className="space-y-2">
          {lowStock.map((i) => (
            <div key={i.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-white text-sm font-medium">{i.name}</div>
                <div className="text-white/40 text-xs">
                  {i.stock} {i.unit} remaining • Reorder point: {i.reorder}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  i.stock === 0 ? "bg-red-500/15 text-red-400" : "bg-yellow-500/15 text-yellow-400"
                }`}
              >
                {i.stock === 0 ? "Order Now" : "Reorder Soon"}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
