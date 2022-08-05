import InternalsTable from "./state-tables-components/InternalsTable"
import RegisterTable from "./state-tables-components/RegisterTable"
import FlagsTable from "./state-tables-components/FlagsTable"

function CPUStateTables({ programState, programStatus }) {
  return (
    <div id='cpu-state-table-container'>
        <InternalsTable programStatus={programStatus} programState={programState} />
        <RegisterTable programStatus={programStatus} programState={programState} />
        <FlagsTable programStatus={programStatus} programState={programState} />
    </div>
  )
}

export default CPUStateTables
