interface StatusBadgeProps {
  status: 'online' | 'offline' | 'warning'
  label: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`badge ${status}`}>
      <span className="badge-dot" />
      {label}
    </span>
  )
}
