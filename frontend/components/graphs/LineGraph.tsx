import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { CONSTANTS } from '@/utils'

const data = [
  {
    name: 'January',
    Customers: 4000,
    Products: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    Customers: 3000,
    Products: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    Customers: 2000,
    Products: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    Customers: 2780,
    Products: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Customers: 1890,
    Products: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    Customers: 2390,
    Products: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    Customers: 3490,
    Products: 4300,
    amt: 2100,
  },
]

const LineGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Customers"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Products" stroke={CONSTANTS.PRIMARY} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineGraph
