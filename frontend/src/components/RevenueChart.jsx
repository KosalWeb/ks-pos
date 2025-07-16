import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { use30DaysAgoReport } from "../hooks/use30DaysAgoReport";
import { formatDate } from "../utils/formatDate";
function RevenueChart() {

  const {data} = use30DaysAgoReport()
  let sales = data?.map(item => {
        const date = formatDate(item.createdAt, 'DD/MMM')
        return{
            ...item,
            createdAt: date
        }
  })
  console.log(sales)
  return (
    <div style={{ width:'100%', height: '400px' }}>
      <h1 style={{textAlign: 'center', marginBottom: '8px'}}>Sale in 30 days</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalCost" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
