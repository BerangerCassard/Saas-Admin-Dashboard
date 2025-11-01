import { DollarSign, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../components/Card';
import { KPICard } from '../components/KPICard';
import { Badge } from '../components/Badge';
import {
  mockKPIMetrics,
  mockMRRData,
  mockUserGrowthData,
  mockRevenueByPlan,
  mockRecentSubscriptions
} from '../data/mockData';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

export function Overview() {
  const metrics = mockKPIMetrics;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'trial':
        return <Badge variant="info">Trial</Badge>;
      case 'canceled':
        return <Badge variant="neutral">Canceled</Badge>;
      case 'past_due':
        return <Badge variant="warning">Past Due</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
        <p className="mt-2 text-slate-600">
          Monitor your SaaS metrics and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Monthly Recurring Revenue"
          value={formatCurrency(metrics.mrr)}
          change={metrics.mrrGrowth}
          changeLabel="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <KPICard
          title="Active Users"
          value={formatNumber(metrics.activeUsers)}
          change={metrics.activeUsersGrowth}
          changeLabel="vs last month"
          icon={<Users className="w-5 h-5" />}
        />
        <KPICard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={metrics.conversionRateChange}
          changeLabel="vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="Churn Rate"
          value={`${metrics.churnRate}%`}
          change={metrics.churnRateChange}
          changeLabel="vs last month"
          icon={<TrendingDown className="w-5 h-5" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MRR Evolution</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={mockMRRData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="newMRR"
                stroke="#10b981"
                strokeWidth={2}
                name="New MRR"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="expansion"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Expansion"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="churn"
                stroke="#ef4444"
                strokeWidth={2}
                name="Churn"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth by Plan</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockUserGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="enterprise"
                  stackId="1"
                  stroke="#7c3aed"
                  fill="#7c3aed"
                  name="Enterprise"
                />
                <Area
                  type="monotone"
                  dataKey="pro"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Pro"
                />
                <Area
                  type="monotone"
                  dataKey="basic"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  name="Basic"
                />
                <Area
                  type="monotone"
                  dataKey="trial"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="Trial"
                />
                <Area
                  type="monotone"
                  dataKey="free"
                  stackId="1"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  name="Free"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockRevenueByPlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="plan"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar
                  dataKey="revenue"
                  fill="#0f172a"
                  radius={[6, 6, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockRecentSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {sub.customerName}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="capitalize text-slate-700">{sub.plan}</span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      {formatCurrency(sub.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {getStatusBadge(sub.status)}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {format(sub.date, 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
