import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, Download, Filter, Calendar, Clock } from 'lucide-react';

const FORECAST_DATA = [
  { name: 'Week 1', actual: 450, forecast: 450 },
  { name: 'Week 2', actual: 520, forecast: 500 },
  { name: 'Week 3', actual: 480, forecast: 520 },
  { name: 'Week 4', actual: 550, forecast: 540 },
  { name: 'Week 5', actual: null, forecast: 580 },
  { name: 'Week 6', actual: null, forecast: 620 },
  { name: 'Week 7', actual: null, forecast: 650 },
  { name: 'Week 8', actual: null, forecast: 680 },
];

export default function ProductionForecasting() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="text-orange-500" /> AI Production Forecasting
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={16} /> Export Forecast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Production Output Forecast (Next 4 Weeks)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_DATA}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="actual" stroke="#f97316" fillOpacity={1} fill="url(#colorActual)" name="Actual Output" />
                <Area type="monotone" dataKey="forecast" stroke="#71717a" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" name="AI Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Forecasting Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">Demand Surge Expected</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                AI models predict a 15% increase in demand for Product A starting in Week 6 due to seasonal trends and historical order patterns.
              </p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Clock size={16} />
                <span className="text-sm font-bold">Optimal Batch Size</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                To meet the forecasted demand efficiently, the AI recommends increasing batch sizes by 10% for the next two weeks.
              </p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <Calendar size={16} />
                <span className="text-sm font-bold">Resource Allocation</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Shift planning should account for an extra 4 hours of overtime in Week 7 to meet the production peak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
