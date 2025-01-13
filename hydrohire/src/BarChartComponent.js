import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

const BarChartComponent = ({ data, barColors }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BarChart width={600} height={350} data={data}>
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
