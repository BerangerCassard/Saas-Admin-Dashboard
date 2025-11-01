import { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import {
  mockAcquisitionSources,
  mockCohortData,
  mockUserGrowthData
} from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

type PeriodPreset = '7d' | '30d' | '3m' | '12m' | 'ytd' | 'custom';

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodPreset>('30d');

  const funnelData = [
    { stage: 'Visitors', value: 15420, color: '#cbd5e1' },
    { stage: 'Signups', value: 3547, color: '#94a3b8' },
    { stage: 'Trials', value: 876, color: '#64748b' },
    { stage: 'Paid', value: 217, color: '#0f172a' }
  ];

  const trafficSources = mockAcquisitionSources;

  const engagementData = [
    { metric: 'DAU', value: 847 },
    { metric: 'MAU', value: 3547 },
    { metric: 'DAU/MAU', value: 23.9 }
  ];

  const featureUsage = [
    { feature: 'Dashboard', usage: 95 },
    { feature: 'Reports', usage: 78 },
    { feature: 'Collaboration', usage: 62 },
    { feature: 'API Access', usage: 41 },
    { feature: 'Integrations', usage: 34 }
  ];

  const churnByPlan = [
    { plan: 'Basic', rate: 5.2 },
    { plan: 'Pro', rate: 3.1 },
    { plan: 'Enterprise', rate: 1.8 }
  ];

  const getCohortColor = (value: number) => {
    if (value >= 90) return 'bg-emerald-500';
    if (value >= 80) return 'bg-emerald-400';
    if (value >= 70) return 'bg-emerald-300';
    if (value >= 60) return 'bg-amber-300';
    if (value >= 50) return 'bg-amber-400';
    if (value > 0) return 'bg-red-400';
    return 'bg-slate-200';
  };

  const periodLabels: Record<PeriodPreset, string> = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '3m': 'Last 3 months',
    '12m': 'Last 12 months',
    'ytd': 'Year to date',
    'custom': 'Custom range'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="mt-2 text-slate-600">
            Deep insights into acquisition, engagement, and retention
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md">
            <Calendar className="w-4 h-4 text-slate-600" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as PeriodPreset)}
              className="text-sm text-slate-700 focus:outline-none"
            >
              {Object.entries(periodLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Acquisition</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {funnelData.map((item, index) => {
                  const percentage =
                    index === 0 ? 100 : (item.value / funnelData[0].value) * 100;
                  const conversionRate =
                    index > 0
                      ? ((item.value / funnelData[index - 1].value) * 100).toFixed(1)
                      : null;

                  return (
                    <div key={item.stage}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">
                          {item.stage}
                        </span>
                        <div className="flex items-center gap-3">
                          {conversionRate && (
                            <span className="text-xs text-slate-500">
                              {conversionRate}% conversion
                            </span>
                          )}
                          <span className="text-sm font-semibold text-slate-900">
                            {item.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 flex items-center justify-center text-sm font-medium text-white transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: item.color
                          }}
                        >
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm text-slate-700">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">
                      {source.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Engagement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {engagementData.map((item) => (
            <Card key={item.metric}>
              <CardContent className="py-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">{item.metric}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {typeof item.value === 'number' && item.value < 100
                      ? `${item.value}%`
                      : item.value.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureUsage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                  unit="%"
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Usage']}
                />
                <Bar dataKey="usage" fill="#0f172a" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Retention</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 text-xs font-medium text-slate-600">
                        Cohort
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M0
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M1
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M2
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M3
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M4
                      </th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-slate-600">
                        M5
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCohortData.map((cohort) => (
                      <tr key={cohort.cohort}>
                        <td className="py-2 px-3 text-xs font-medium text-slate-900">
                          {cohort.cohort}
                        </td>
                        {[
                          cohort.month0,
                          cohort.month1,
                          cohort.month2,
                          cohort.month3,
                          cohort.month4,
                          cohort.month5
                        ].map((value, index) => (
                          <td key={index} className="py-2 px-3">
                            {value > 0 ? (
                              <div
                                className={`py-1 px-2 rounded text-xs font-medium text-center ${getCohortColor(
                                  value
                                )} text-white`}
                              >
                                {value}%
                              </div>
                            ) : (
                              <div className="py-1 px-2 rounded text-xs font-medium text-center bg-slate-100 text-slate-400">
                                -
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded" />
                  <span>90%+</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-300 rounded" />
                  <span>70-90%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-300 rounded" />
                  <span>50-70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-400 rounded" />
                  <span>&lt;50%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Churn Rate by Plan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {churnByPlan.map((item) => (
                  <div key={item.plan}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">
                        {item.plan}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {item.rate}%
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${(item.rate / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">
                  Lower churn rates in higher-tier plans indicate better value
                  perception and stickiness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
