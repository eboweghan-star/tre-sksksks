const logs = [
  { time: '14:32:01', level: 'info' as const, message: 'Server started on port 3000' },
  { time: '14:32:05', level: 'info' as const, message: 'Connected to database pool (5 connections)' },
  { time: '14:33:12', level: 'info' as const, message: 'GET /api/users 200 45ms' },
  { time: '14:34:08', level: 'warn' as const, message: 'Memory usage above 65% threshold' },
  { time: '14:35:22', level: 'info' as const, message: 'POST /api/auth/login 200 120ms' },
  { time: '14:36:01', level: 'error' as const, message: 'Worker-2 task timeout after 30s' },
  { time: '14:36:02', level: 'info' as const, message: 'Retrying failed task (attempt 2/3)' },
  { time: '14:36:15', level: 'info' as const, message: 'Task completed successfully on retry' },
  { time: '14:37:44', level: 'warn' as const, message: 'Rate limit approaching for client 192.168.1.42' },
  { time: '14:38:00', level: 'info' as const, message: 'Scheduled backup started' },
]

export function Logs() {
  return (
    <>
      <div className="page-header">
        <h1>Logs</h1>
        <p>View system logs and application events.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Application Logs</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn btn-secondary">
              Filter
            </button>
            <button type="button" className="btn btn-secondary">
              Export
            </button>
          </div>
        </div>
        <div className="panel-body">
          {logs.map((log) => (
            <div key={`${log.time}-${log.message}`} className="log-entry">
              <span className="log-time">{log.time}</span>
              <span className={`log-level ${log.level}`}>
                {log.level.toUpperCase()}
              </span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
