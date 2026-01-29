"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DeploymentVelocity = ({ orders }) => {
  const data = orders.map(order => ({ name: order.orderTitle.substring(0, 10), progress: order.progress }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid #22d3ee30", borderRadius: "12px", color: "#fff" }} />
        <Area type="monotone" dataKey="progress" stroke="#22d3ee" strokeWidth={3} fill="url(#velocityGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default DeploymentVelocity;