import { Card, CardContent } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function KPICard({ title, value, change, changeLabel, icon }: KPICardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-emerald-600' : 'text-red-600';
  const changeBg = isPositive ? 'bg-emerald-50' : 'bg-red-50';

  return (
    <Card hover>
      <CardContent className="py-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${changeBg}`}>
                {isPositive ? (
                  <TrendingUp className={`w-3.5 h-3.5 ${changeColor}`} />
                ) : (
                  <TrendingDown className={`w-3.5 h-3.5 ${changeColor}`} />
                )}
                <span className={`text-xs font-medium ${changeColor}`}>
                  {isPositive ? '+' : ''}{change.toFixed(1)}%
                </span>
              </div>
              {changeLabel && (
                <span className="text-xs text-slate-500">{changeLabel}</span>
              )}
            </div>
          </div>
          {icon && (
            <div className="ml-4 p-3 bg-slate-50 rounded-lg text-slate-600">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
