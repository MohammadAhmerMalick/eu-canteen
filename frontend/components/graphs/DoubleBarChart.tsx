import {
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  BarChart,
  Rectangle,
  CartesianGrid,
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
const DoubleBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="Customers"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Products"
          fill={CONSTANTS.PRIMARY}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default DoubleBarChart
