import React from 'react'
import { getSalesDeals } from '../utils';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis, YAxis,
  Tooltip,
  Bar,
} from 'recharts';

export default function Dashboard() {

  const [sales, setSales] = React.useState([])

  React.useEffect(() => {
    getSalesDeals(setSales);
  }, [])

  function setMaxYAxis() {
    const max = Math.max(...sales.map((item) => item.sum));
    return sales ? max + 1000 : 5000
  }

  const responsiveContainerStyle = {
    maxWidth: '600px',
    margin: "1em auto"
  }

  const axisStyle = {
    fill: '#111'
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {
        sales
        ? (
          <ResponsiveContainer width="100%" height={400} style={responsiveContainerStyle}>
            <BarChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={axisStyle} />
              <YAxis domain={[0, setMaxYAxis()]} style={axisStyle} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sum" fill="#2dc653" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
        : null
      }
    </div>
  )
}
