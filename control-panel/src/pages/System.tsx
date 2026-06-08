import { StatusBadge } from '../components/StatusBadge'

const resources = [
  { label: 'CPU Usage', value: 42, color: 'blue' as const },
  { label: 'Memory', value: 68, color: 'yellow' as const },
  { label: 'Disk', value: 35, color: 'green' as const },
  { label: 'Network', value: 22, color: 'blue' as const },
]

const processes = [
  { name: 'api-server', pid: 1247, cpu: '12%', memory: '256 MB', status: 'online' as const },
  { name: 'worker-1', pid: 1248, cpu: '8%', memory: '128 MB', status: 'online' as const },
  { name: 'worker-2', pid: 1249, cpu: '45%', memory: '512 MB', status: 'warning' as const },
  { name: 'redis', pid: 1250, cpu: '2%', memory: '64 MB', status: 'online' as const },
  { name: 'postgres', pid: 1251, cpu: '5%', memory: '384 MB', status: 'online' as const },
]

export function System() {
  return (
    <>
      <div className="page-header">
        <h1>System</h1>
        <p>Monitor server resources and running processes.</p>
      </div>

      <div className="stats-grid">
        {resources.map((resource) => (
          <div key={resource.label} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">{resource.label}</span>
              <span className="stat-card-value" style={{ fontSize: '1.25rem' }}>
                {resource.value}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${resource.color}`}
                style={{ width: `${resource.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Running Processes</h2>
          <button type="button" className="btn btn-secondary">
            Refresh
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Process</th>
                <th>PID</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((proc) => (
                <tr key={proc.pid}>
                  <td style={{ fontFamily: 'monospace' }}>{proc.name}</td>
                  <td>{proc.pid}</td>
                  <td>{proc.cpu}</td>
                  <td>{proc.memory}</td>
                  <td>
                    <StatusBadge
                      status={proc.status}
                      label={proc.status === 'online' ? 'Running' : 'High Load'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
