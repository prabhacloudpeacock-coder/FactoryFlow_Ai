import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { Download, Filter, TrendingUp, DollarSign } from 'lucide-react';

const SALES_DATA = [
  { month: 'Jan', bikeUnits: 120, partUnits: 450, bikeRevenue: 240000, partRevenue: 45000 },
  { month: 'Feb', bikeUnits: 150, partUnits: 520, bikeRevenue: 300000, partRevenue: 52000 },
  { month: 'Mar', bikeUnits: 180, partUnits: 610, bikeRevenue: 360000, partRevenue: 61000 },
  { month: 'Apr', bikeUnits: 140, partUnits: 480, bikeRevenue: 280000, partRevenue: 48000 },
  { month: 'May', bikeUnits: 210, partUnits: 750, bikeRevenue: 420000, partRevenue: 75000 },
  { month: 'Jun', bikeUnits: 250, partUnits: 890, bikeRevenue: 500000, partRevenue: 89000 },
];

export default function SalesReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <TrendingUp className="text-orange-500" size={20} /> Sales Records
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total EV Bikes Sold</p>
          <h3 className="text-2xl font-bold text-zinc-100">1,050 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
          <p className="text-[10px] text-green-500 mt-1">+15% vs Last Year</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Parts Sold</p>
          <h3 className="text-2xl font-bold text-zinc-100">3,700 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
          <p className="text-[10px] text-green-500 mt-1">+22% vs Last Year</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-zinc-100">$2.47M</h3>
          <p className="text-[10px] text-green-500 mt-1">+18% vs Last Year</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Parts Revenue Share</p>
          <h3 className="text-2xl font-bold text-zinc-100">15%</h3>
          <p className="text-[10px] text-zinc-500 mt-1">Growing segment</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Monthly Sales & Revenue</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_DATA}>
              <defs>
                <linearGradient id="colorBikeRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPartRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#f4f4f5' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area yAxisId="left" type="monotone" dataKey="bikeRevenue" stackId="1" stroke="#f97316" fillOpacity={1} fill="url(#colorBikeRev)" name="Bike Revenue ($)" />
              <Area yAxisId="left" type="monotone" dataKey="partRevenue" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPartRev)" name="Part Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="bikeUnits" stroke="#f97316" strokeWidth={2} name="Bike Units" />
              <Line yAxisId="right" type="monotone" dataKey="partUnits" stroke="#3b82f6" strokeWidth={2} name="Part Units" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
