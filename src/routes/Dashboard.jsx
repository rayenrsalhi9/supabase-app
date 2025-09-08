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
    margin: "2em auto"
  }

  const axisStyle = {
    fill: '#111'
  }

  return (
    <div>
      <header className='dashboard-header'>
        <h1>Sales Dashboard</h1>
      </header>
      {
        sales
        ? (
          <div className='dashboard-container'>
            <h2>Total sales this quarter</h2>
            <ResponsiveContainer width="100%" height={400} style={responsiveContainerStyle}>
              <BarChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={axisStyle} />
                <YAxis domain={[0, setMaxYAxis()]} style={axisStyle} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sum" fill="#2dc653" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
        : null
      }
    </div>
  )
}
