import React, { useState, useEffect } from 'react';
import millify from 'millify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, Tooltip,
   ResponsiveContainer,
} from 'recharts';
import "./Chartgraph.css";

export default function Chartgraph({ chart, history }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    console.log("selected history",history);
  
    const data = history.map((data) => ({
        name: new Date(data.timestamp * 1000).toLocaleDateString('en-US'), // Multiply by 1000 to convert seconds to milliseconds
        uv: parseFloat(millify(data.price)),
      }));
      
      
      const chartHeight = screenWidth <= 500 ? 250 : 400;

  return (
    <div>
   
      <ResponsiveContainer width="100%" height={chartHeight} className="height">
        <BarChart
         data={data}
         className='bar'
              >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'black', color: 'white' }} />
           <Bar className='bar'
            dataKey="uv"
            fill="#ffffff"
       />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
