import React from 'react';
import { useTheme } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useMediaQuery } from '@mui/system';

const PieChartComponent = ({ data, pieColors }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const chartWidth = isMobile ? 300 : 400;
    const chartHeight = isMobile ? 300 : 400;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={chartWidth} height={chartHeight}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={chartWidth / 3}
                    fill={pieColors[0]}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
