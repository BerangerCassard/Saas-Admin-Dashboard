import { useState, useMemo } from 'react';
import { Search, CreditCard, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { mockSubscriptions } from '../data/mockData';
import { format } from 'date-fns';
import { PlanType, SubscriptionStatus, BillingCycle } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function Subscriptions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<SubscriptionStatus | 'all'>('all');
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle | 'all'>('all');

  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter((sub) => {
      const matchesSearch = sub.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPlan = selectedPlan === 'all' || sub.plan === selectedPlan;
      const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
      const matchesCycle = selectedCycle === 'all' || sub.billingCycle === selectedCycle;

      return matchesSearch && matchesPlan && matchesStatus && matchesCycle;
    });
  }, [searchQuery, selectedPlan, selectedStatus, selectedCycle]);

  const billingCycleData = useMemo(() => {
    const monthly = mockSubscriptions.filter((s) => s.billingCycle === 'monthly').length;
    const yearly = mockSubscriptions.filter((s) => s.billingCycle === 'yearly').length;
    return [
      { name: 'Monthly', value: monthly, color: '#3b82f6' },
      { name: 'Yearly', value: yearly, color: '#10b981' }
    ];
  }, []);

  const avgLTV = useMemo(() => {
    const total = mockSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
    return total / mockSubscriptions.length * 24;
  }, []);

  const avgDuration = 18.5;
  const upgradeRate = 8.7;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'past_due':
        return <Badge variant="warning">Past Due</Badge>;
      case 'canceled':
        return <Badge variant="neutral">Canceled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: PlanType) => {
    switch (plan) {
      case 'enterprise':
        return <Badge variant="info">Enterprise</Badge>;
      case 'pro':
        return <Badge variant="success">Pro</Badge>;
      case 'basic':
        return <Badge variant="neutral">Basic</Badge>;
      default:
        return <Badge variant="neutral">{plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Subscriptions</h1>
        <p className="mt-2 text-slate-600">Monitor active subscriptions and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average LTV</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {formatCurrency(avgLTV)}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <CreditCard className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Duration</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {avgDuration} months
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Upgrade Rate</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {upgradeRate}%
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-2xl">↗️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search by customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-4 h-4" />}
                  />
                </div>

                <div className="flex gap-3">
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as PlanType | 'all')}
                    className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  >
                    <option value="all">All Plans</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>

                  <select
                    value={selectedCycle}
                    onChange={(e) =>
                      setSelectedCycle(e.target.value as BillingCycle | 'all')
                    }
                    className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  >
                    <option value="all">All Cycles</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-slate-600">
                Showing {filteredSubscriptions.length} subscriptions
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
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
                      Cycle
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                      Next Payment
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.slice(0, 10).map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-900">
                        {sub.customerName}
                      </td>
                      <td className="py-3 px-4">{getPlanBadge(sub.plan)}</td>
                      <td className="py-3 px-4">
                        <Badge variant="neutral" className="capitalize">
                          {sub.billingCycle}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">
                        {formatCurrency(sub.amount)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {sub.nextPayment
                          ? format(sub.nextPayment, 'MMM d, yyyy')
                          : '-'}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(sub.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Cycle Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={billingCycleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {billingCycleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-3">
              {billingCycleData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
