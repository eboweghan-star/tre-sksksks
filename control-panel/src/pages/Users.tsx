import { StatusBadge } from '../components/StatusBadge'

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'online' as const,
    initials: 'AJ',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'online' as const,
    initials: 'BS',
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'Viewer',
    status: 'offline' as const,
    initials: 'CW',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Editor',
    status: 'online' as const,
    initials: 'DB',
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    role: 'Viewer',
    status: 'offline' as const,
    initials: 'ED',
  },
]

export function Users() {
  return (
    <>
      <div className="page-header">
        <h1>Users</h1>
        <p>Manage user accounts, roles, and permissions.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>All Users ({users.length})</h2>
          <button type="button" className="btn btn-primary">
            Add User
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar">{user.initials}</div>
                      <div>
                        <div>{user.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <StatusBadge
                      status={user.status}
                      label={user.status === 'online' ? 'Active' : 'Inactive'}
                    />
                  </td>
                  <td>
                    <button type="button" className="btn btn-secondary">
                      Edit
                    </button>
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
