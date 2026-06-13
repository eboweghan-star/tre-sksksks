import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative'
  icon: LucideIcon
  iconColor: 'blue' | 'green' | 'yellow' | 'red'
}

export function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className={`stat-card-icon ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${changeType ?? 'positive'}`}>
          {change}
        </div>
      )}
    </div>
  )
}
