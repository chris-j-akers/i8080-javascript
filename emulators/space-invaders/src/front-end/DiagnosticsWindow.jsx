import RegisterTable from './diagnostic-components/RegisterTable';
import InternalsTable from './diagnostic-components/InternalsTable'
import FlagsTable from './diagnostic-components/FlagsTable'
import TraceWindow from './diagnostic-components/TraceWindow';

function DiagnosticsWindow({ programState, programStatus, traceDisabled, trace }) {
  return (
      <div className='diag-container'>
        <RegisterTable programState={programState} programStatus={programStatus} />
        <InternalsTable programState={programState} programStatus={programStatus}/>
        <FlagsTable programStatus={programStatus} programState={programState} />
        <TraceWindow programStatus={programStatus} trace={trace} traceDisabled={traceDisabled}/>
      </div>
  )
}

export default DiagnosticsWindow
