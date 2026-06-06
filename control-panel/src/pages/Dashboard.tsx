import {
  Users,
  Activity,
  Server,
  AlertTriangle,
  UserPlus,
  Settings,
  RefreshCw,
} from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { StatusBadge } from '../components/StatusBadge'

const recentActivity = [
  {
    icon: UserPlus,
    message: 'New user registered: jane.doe@example.com',
    time: '2 min ago',
  },
  {
    icon: Settings,
    message: 'System settings updated by admin',
    time: '15 min ago',
  },
  {
    icon: RefreshCw,
    message: 'Database backup completed successfully',
    time: '1 hour ago',
  },
  {
    icon: AlertTriangle,
    message: 'High memory usage detected on worker-2',
    time: '3 hours ago',
  },
]

const services = [
  { name: 'API Server', status: 'online' as const, uptime: '99.98%' },
  { name: 'Database', status: 'online' as const, uptime: '99.99%' },
  { name: 'Cache', status: 'online' as const, uptime: '100%' },
  { name: 'Worker Queue', status: 'warning' as const, uptime: '98.2%' },
]

export function Dashboard() {
  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your system status and recent activity.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Users"
          value="2,847"
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
          iconColor="blue"
        />
        <StatCard
          label="Active Sessions"
          value="384"
          change="+4.2% from yesterday"
          changeType="positive"
          icon={Activity}
          iconColor="green"
        />
        <StatCard
          label="Uptime"
          value="99.9%"
          change="Last 30 days"
          icon={Server}
          iconColor="green"
        />
        <StatCard
          label="Alerts"
          value="3"
          change="2 resolved today"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="yellow"
        />
      </div>

      <div className="panel-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="panel-body">
            <ul className="activity-list">
              {recentActivity.map((item) => (
                <li key={item.message} className="activity-item">
                  <div className="activity-icon">
                    <item.icon size={15} />
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{item.message}</p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Service Status</h2>
          </div>
          <div className="panel-body">
            <div className="service-list">
              {services.map((service) => (
                <div key={service.name} className="service-item">
                  <div>
                    <div className="service-name">
                      <Server size={15} />
                      {service.name}
                    </div>
                    <div className="service-meta">
                      Uptime: {service.uptime}
                    </div>
                  </div>
                  <StatusBadge
                    status={service.status}
                    label={
                      service.status === 'online' ? 'Online' : 'Degraded'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
