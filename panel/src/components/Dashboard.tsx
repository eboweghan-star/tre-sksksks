import { StatCard } from './StatCard'

const activity = [
  { id: 1, user: 'Alex Rivera', action: 'Updated project settings', time: '2 min ago' },
  { id: 2, user: 'Sam Chen', action: 'Invited 3 team members', time: '18 min ago' },
  { id: 3, user: 'Jordan Lee', action: 'Exported monthly report', time: '1 hr ago' },
  { id: 4, user: 'Morgan Blake', action: 'Created new workspace', time: '3 hr ago' },
]

export function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dashboard__stats" aria-label="Key metrics">
        <StatCard label="Total users" value="12,847" change="+12.4% vs last month" />
        <StatCard label="Active sessions" value="1,203" change="+8.1% vs yesterday" />
        <StatCard label="Revenue" value="$48.2k" change="+5.2% vs last week" />
        <StatCard label="Support tickets" value="23" change="-18% vs last week" positive={false} />
      </section>

      <div className="dashboard__grid">
        <section className="panel-card panel-card--wide">
          <div className="panel-card__head">
            <h2>Overview</h2>
            <span className="badge">Last 7 days</span>
          </div>
          <div className="chart-placeholder" role="img" aria-label="Chart placeholder">
            <div className="chart-bars">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-card__head">
            <h2>Recent activity</h2>
          </div>
          <ul className="activity-list">
            {activity.map((item) => (
              <li key={item.id}>
                <div className="activity-list__avatar" aria-hidden>
                  {item.user.charAt(0)}
                </div>
                <div>
                  <strong>{item.user}</strong>
                  <p>{item.action}</p>
                </div>
                <time>{item.time}</time>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
