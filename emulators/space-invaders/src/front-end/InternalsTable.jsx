function InternalsTable({ programState, programStatus }) {
    return (
        <div className='diag-table-container'>
        <table className ={`diag-table ${programStatus === 'RUNNING' && 'greyed-out'}`}>
            <caption>
                Internal Field State
            </caption>
            <thead>
                <tr>
                    <th>FIELD</th>
                    <th>DEC</th>
                    <th>HEX</th>
                    <th>BIN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>PROGRAM COUNTER</td>
                    <td>{programState.CPUState.ProgramCounter.toString().padStart(5,'0')}</td>
                    <td>{`0x${programState.CPUState.ProgramCounter.toString(16).padStart(8,'0')}`}</td>
                    <td>{`${programState.CPUState.ProgramCounter.toString(2).padStart(16,'0')}`}</td>
                </tr>
                <tr>
                    <td>STACK POINTER</td>
                    <td>{programState.CPUState.StackPointer.toString().padStart(5,'0')}</td>
                    <td>{`0x${programState.CPUState.StackPointer.toString(16).padStart(8,'0')}`}</td>
                    <td>{`${programState.CPUState.StackPointer.toString(2).padStart(16,'0')}`}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

InternalsTable.defaultProps = {
    programState: {
        CPUState: {
            ProgramCounter: 0,
            StackPointer: 0,
        }
    }
  }

export default InternalsTable
