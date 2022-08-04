
function StatusCard({ running }) {
  return (
    <div id='control-panel-status-card' className={running ? 'status-card-running' : 'status-card-stopped'}>
      {running ? 'RUNNING' : 'STOPPED'}
    </div>
  )
}

export default StatusCard
