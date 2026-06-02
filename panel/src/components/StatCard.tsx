type StatCardProps = {
  label: string
  value: string
  change: string
  positive?: boolean
}

export function StatCard({ label, value, change, positive = true }: StatCardProps) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      <p className={`stat-card__change ${positive ? 'stat-card__change--up' : 'stat-card__change--down'}`}>
        {change}
      </p>
    </article>
  )
}
