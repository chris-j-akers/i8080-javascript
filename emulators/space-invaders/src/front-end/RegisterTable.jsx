function RegisterTable({ programState, programStatus }) {
    return (
        <div className='diag-table-container'>
        <table className ={`diag-table ${programStatus === 'RUNNING' && 'greyed-out'}`}>
            <caption>
                CPU Register State
            </caption>
            <thead>
                <tr>
                    <th>REGISTER</th>
                    <th>DEC</th>
                    <th>HEX</th>
                    <th>BIN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>A</td>
                    <td>{programState.CPUState.Registers.A.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.A.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.A.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>{programState.CPUState.Registers.B.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.B.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.B.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>C</td>
                    <td>{programState.CPUState.Registers.C.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.C.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.C.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>{programState.CPUState.Registers.D.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.D.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.D.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>{programState.CPUState.Registers.E.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.E.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.E.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>H</td>
                    <td>{programState.CPUState.Registers.H.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.H.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.H.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>{programState.CPUState.Registers.L.toString().padStart(3,'0')}</td>
                    <td>{`0x${programState.CPUState.Registers.L.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${programState.CPUState.Registers.L.toString(2).padStart(8,'0')}`}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

RegisterTable.defaultProps = {
    programState: {
        CPUState: {
            Registers: {
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                E: 0,
                H: 0,
                L: 0,
            },
        },
    },
}

export default RegisterTable
