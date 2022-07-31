function FlagsTable({ programState, programStatus }) {
    return (
        <div className='diag-table-container'>
        <table className ={`diag-table ${programStatus === 'RUNNING' && 'greyed-out'}`}>
            <caption>
                Flag State
            </caption>
            <thead>
                <tr>
                    <th>FLAG</th>
                    <th>VALUE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CARRY</td>
                    <td>{programState.CPUState.Flags.Carry ? '0x01': '0x00'}</td>
                </tr>
                <tr>
                    <td>PARITY</td>
                    <td>{programState.CPUState.Flags.Parity ? '0x01': '0x00'}</td>
                </tr>
                <tr>
                    <td>AUX-CARRY</td>
                    <td>{programState.CPUState.Flags.AuxillaryCarry ? '0x01': '0x00'}</td>
                </tr>
                <tr>
                    <td>ZERO</td>
                    <td>{programState.CPUState.Flags.Zero ? '0x01': '0x00'}</td>
               </tr>
               <tr>
                    <td>SIGN</td>
                    <td>{programState.CPUState.Flags.Sign ? '0x01': '0x00'}</td>
               </tr>
            </tbody>
        </table>
        </div>
    )
}

FlagsTable.defaultProps = {
    programState : {
        CPUState : {
            Flags : {
                Carry: 0,
                Parity: 0,
                AuxillaryCarry: 0,
                Zero: 0,
                Sign: 0,
            }
        }
    }
  }

export default FlagsTable
