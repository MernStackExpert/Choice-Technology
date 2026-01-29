"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FinancialNode = ({ orders }) => {
  const data = orders.map(order => ({
    name: order.orderId,
    paid: order.paidAmount,
    due: order.unPaidAmount
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
        <YAxis stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "#ffffff05" }} contentStyle={{ backgroundColor: "#000", border: "1px solid #22d3ee30", borderRadius: "12px" }} />
        <Bar dataKey="paid" fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={15} />
        <Bar dataKey="due" fill="#f87171" radius={[6, 6, 0, 0]} barSize={15} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default FinancialNode;