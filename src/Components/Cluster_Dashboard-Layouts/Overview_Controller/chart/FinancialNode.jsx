"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FinancialNode = ({ orders }) => {
  const data = orders
    .filter(order => order.status !== "cancelled")
    .map(order => ({
      name: order.orderId,
      paid: order.paidAmount,
      due: order.unPaidAmount
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          stroke="#444" 
          fontSize={10} 
          axisLine={false} 
          tickLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#444" 
          fontSize={10} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip 
          cursor={{ fill: "#ffffff05" }} 
          contentStyle={{ 
            backgroundColor: "#000", 
            border: "1px solid #22d3ee30", 
            borderRadius: "12px",
            fontSize: "12px"
          }} 
        />
        <Bar dataKey="paid" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="due" fill="#f87171" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialNode;