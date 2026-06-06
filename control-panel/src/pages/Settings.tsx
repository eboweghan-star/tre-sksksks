import { useState } from 'react'
import { Toggle } from '../components/Toggle'

export function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure system preferences and security options.</p>
      </div>

      <div className="panel" style={{ marginBottom: '16px' }}>
        <div className="panel-body">
          <div className="settings-section">
            <h3>General</h3>
            <p>Basic application configuration.</p>

            <div className="form-group">
              <label htmlFor="app-name">Application Name</label>
              <input
                id="app-name"
                className="form-input"
                type="text"
                defaultValue="Control Panel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select id="timezone" className="form-input" defaultValue="utc">
                <option value="utc">UTC</option>
                <option value="est">Eastern (EST)</option>
                <option value="pst">Pacific (PST)</option>
                <option value="cet">Central European (CET)</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notifications</h3>
            <p>Control how you receive alerts and updates.</p>

            <div className="setting-row">
              <div className="setting-info">
                <label>Email Notifications</label>
                <span>Receive alerts via email</span>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
          </div>

          <div className="settings-section">
            <h3>System</h3>
            <p>Server and maintenance settings.</p>

            <div className="setting-row">
              <div className="setting-info">
                <label>Automatic Backups</label>
                <span>Run daily backups at 2:00 AM UTC</span>
              </div>
              <Toggle checked={autoBackup} onChange={setAutoBackup} />
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <label>Maintenance Mode</label>
                <span>Disable public access during maintenance</span>
              </div>
              <Toggle checked={maintenanceMode} onChange={setMaintenanceMode} />
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <label>Debug Mode</label>
                <span>Enable verbose logging</span>
              </div>
              <Toggle checked={debugMode} onChange={setDebugMode} />
            </div>
          </div>

          <div className="settings-section">
            <h3>Security</h3>
            <p>Authentication and access control.</p>

            <div className="setting-row">
              <div className="setting-info">
                <label>Two-Factor Authentication</label>
                <span>Require 2FA for all admin accounts</span>
              </div>
              <Toggle checked={twoFactor} onChange={setTwoFactor} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
