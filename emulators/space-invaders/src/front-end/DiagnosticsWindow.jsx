import RegisterTable from './diagnostic-components/RegisterTable';
import InternalsTable from './diagnostic-components/InternalsTable'
import FlagsTable from './diagnostic-components/FlagsTable'
import TraceWindow from './diagnostic-components/TraceWindow';
import DiagnosticControlPanel from './cabinet-components/DiagnosticControlPanel';

function DiagnosticsWindow({ programState, programStatus, trace, invadersWebWorker }) {
  return (
    <>
    <div className='diag-window shadow'>
      <div className='diag-container'>
        <TraceWindow programStatus={programStatus} trace={trace}/>
        <RegisterTable programState={programState} programStatus={programStatus} />
        <InternalsTable programState={programState} programStatus={programStatus}/>
        <FlagsTable programStatus={programStatus} programState={programState} />
      </div>
    </div>
    </>
  )
}

export default DiagnosticsWindow
