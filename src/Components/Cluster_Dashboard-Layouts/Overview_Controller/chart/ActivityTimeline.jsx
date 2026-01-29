"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ActivityTimeline = ({ payments = [] }) => {
  
  const chartData = payments.length > 0 
    ? payments.map((p) => ({
        date: new Date(p.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        amount: parseFloat(p.amountPaid || 0),
      })).reverse() 
    : [{ date: "No Data", amount: 0 }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#444" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#444" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "#000", border: "1px solid #a855f730", borderRadius: "12px", fontSize: "12px" }}
          itemStyle={{ color: "#a855f7" }}
          cursor={{ stroke: "#a855f750", strokeWidth: 1 }}
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#a855f7" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#activityGrad)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityTimeline;