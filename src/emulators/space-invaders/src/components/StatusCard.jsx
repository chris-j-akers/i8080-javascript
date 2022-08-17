
function StatusCard({ running }) {
  return (
    <div id='control-panel-status-card'>
      {running ? 'RUNNING' : 'STOPPED'}
    </div>
  )
}

export default StatusCard
