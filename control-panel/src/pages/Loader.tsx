import { useState } from 'react'
import {
  Play,
  Square,
  RefreshCw,
  FolderOpen,
  Clock,
  HardDrive,
  Zap,
} from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { StatCard } from '../components/StatCard'

const LOADER_PATH = 'C:\\Users\\egbkh\\Desktop\\Loader_Prem.exe'
const LOADER_NAME = 'Loader_Prem.exe'

const loaderLogs = [
  { time: '15:02:11', level: 'info' as const, message: 'Loader initialized successfully' },
  { time: '15:02:12', level: 'info' as const, message: 'Checking dependencies... OK' },
  { time: '15:02:14', level: 'info' as const, message: 'Connecting to remote server' },
  { time: '15:02:16', level: 'info' as const, message: 'Authentication passed' },
  { time: '15:02:18', level: 'info' as const, message: 'Loading modules (3/3)' },
  { time: '15:02:20', level: 'info' as const, message: 'Loader ready — all systems go' },
]

export function Loader() {
  const [running, setRunning] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleStart() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setRunning(true)
    }, 1500)
  }

  function handleStop() {
    setRunning(false)
    setLoading(false)
  }

  function handleRestart() {
    setLoading(true)
    setRunning(false)
    setTimeout(() => {
      setLoading(false)
      setRunning(true)
    }, 1500)
  }

  return (
    <>
      <div className="page-header">
        <h1>Loader</h1>
        <p>Manage and monitor Loader_Prem.exe</p>
      </div>

      <div className="loader-hero">
        <div className="loader-hero-icon">
          {loading ? (
            <div className="loader-spinner" />
          ) : (
            <Zap size={32} />
          )}
        </div>
        <div className="loader-hero-info">
          <h2>{LOADER_NAME}</h2>
          <p className="loader-path">
            <FolderOpen size={14} />
            {LOADER_PATH}
          </p>
          <div className="loader-hero-status">
            {loading ? (
              <StatusBadge status="warning" label="Starting..." />
            ) : (
              <StatusBadge
                status={running ? 'online' : 'offline'}
                label={running ? 'Running' : 'Stopped'}
              />
            )}
          </div>
        </div>
        <div className="loader-hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleStart}
            disabled={running || loading}
          >
            <Play size={15} />
            Start
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleStop}
            disabled={!running && !loading}
          >
            <Square size={15} />
            Stop
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRestart}
            disabled={loading}
          >
            <RefreshCw size={15} />
            Restart
          </button>
        </div>
      </div>

      {loading && (
        <div className="loader-progress-panel">
          <div className="loader-progress-label">
            <span>Loading...</span>
            <span>Please wait</span>
          </div>
          <div className="loader-progress-bar">
            <div className="loader-progress-fill" />
          </div>
        </div>
      )}

      <div className="stats-grid">
        <StatCard
          label="Version"
          value="2.4.1"
          icon={HardDrive}
          iconColor="blue"
        />
        <StatCard
          label="Last Run"
          value="Today"
          change="15:02:20"
          icon={Clock}
          iconColor="green"
        />
        <StatCard
          label="Uptime"
          value={running ? '00:04:32' : '—'}
          change={running ? 'Since last start' : 'Not running'}
          icon={Zap}
          iconColor="yellow"
        />
        <StatCard
          label="Modules"
          value="3/3"
          change="All loaded"
          icon={RefreshCw}
          iconColor="green"
        />
      </div>

      <div className="panel-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Loader Details</h2>
          </div>
          <div className="panel-body">
            <dl className="detail-list">
              <div className="detail-row">
                <dt>File Name</dt>
                <dd>{LOADER_NAME}</dd>
              </div>
              <div className="detail-row">
                <dt>Location</dt>
                <dd className="detail-mono">{LOADER_PATH}</dd>
              </div>
              <div className="detail-row">
                <dt>Size</dt>
                <dd>4.2 MB</dd>
              </div>
              <div className="detail-row">
                <dt>Last Modified</dt>
                <dd>Jun 4, 2026</dd>
              </div>
              <div className="detail-row">
                <dt>Platform</dt>
                <dd>Windows x64</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Loader Output</h2>
          </div>
          <div className="panel-body">
            {loaderLogs.map((log) => (
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
      </div>
    </>
  )
}
