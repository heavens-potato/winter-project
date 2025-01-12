import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PieChartComponent = ({ data }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart width={500} height={350}>
        <Pie data={data} dataKey="value" nameKey="name" fill="#1976d2" />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
