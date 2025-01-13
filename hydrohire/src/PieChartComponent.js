import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartComponent = ({ data, pieColors }) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={500} height={350}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={150}
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
