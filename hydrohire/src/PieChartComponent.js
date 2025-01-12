import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={500} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" fill="#1976d2" />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
