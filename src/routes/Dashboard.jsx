import { useState, useEffect, useActionState } from 'react';
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

  const [sales, setSales] = useState([])
  const [error, addNewDeal, isPending] = useActionState(
    async (_, formData) => {
      const name = formData.get('name')
      const value = formData.get('value')
      if (parseInt(value) === 0) {
        return 'No 0 values'
      }
      console.log(name)
      console.log(value)
      return null
    }, null
  )

  useEffect(() => {
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
            <div className="dashboard-form-container">
              <h2>Add new deal sale</h2>
              {!isPending && error ? <p className='dashboard-form-error-msg'>{error}</p> : null}
              <form className='dashboard-form' action={addNewDeal}>
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <select name="name" id="name">
                    {sales.map(sale => (
                      <option key={sale.name} value={sale.name}>
                        {sale.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="value">Value:</label>
                  <input type="number" name='value' id='value' min={0} step={10} defaultValue={0} />
                </div>
                <button className="submit-btn" disabled={isPending}>
                  {isPending ? 'Adding deal...' : 'Add deal'}
                </button>
              </form>
            </div>
          </div>
        )
        : null
      }
    </div>
  )
}
