import React from 'react';
import { useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { useMediaQuery } from '@mui/system';

const BarChartComponent = ({ data, barColors }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chartWidth = isMobile ? 300 : 600;
  const chartHeight = isMobile ? 250 : 400;
  const xAxisFontSize = isMobile ? 10 : 15;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '25px', width: '100%', margin: 0 }}>
      <BarChart width={chartWidth} height={chartHeight} data={data}>
        <XAxis dataKey="status" style={{ fontSize: xAxisFontSize }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Status" fill={barColors[5]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
