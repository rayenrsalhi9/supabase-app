import { useState, useEffect } from 'react';
import { getSalesDeals } from '../utils';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis, YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import Form from '../components/Form';
import Header from '../components/Header';
import { supabase } from '../supabase';

export default function Dashboard() {

  const [sales, setSales] = useState([])

  useEffect(() => {
    getSalesDeals(setSales);

    const channel = supabase
      .channel('deals-change')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sales_deals',
        },
        () => getSalesDeals(setSales)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel);
    };
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
      <Header />
      {
        sales
        ? (
          <div className='dashboard-container'>
            <h2>Total sales this quarter ($)</h2>
            <ResponsiveContainer width="100%" height={400} style={responsiveContainerStyle}>
              <BarChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={axisStyle} />
                <YAxis domain={[0, setMaxYAxis()]} style={axisStyle} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sum" fill="#2dc653" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <Form />
            
          </div>
        )
        : null
      }
    </div>
  )
}
