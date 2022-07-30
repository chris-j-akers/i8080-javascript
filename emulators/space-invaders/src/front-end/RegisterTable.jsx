function RegisterTable({ registers, programState }) {
    return (
        <div className='register-table-container'>
        <table className ={`register-table ${programState === 'RUNNING' && 'greyed-out'}`}>
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
                    <td>{registers.A.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.A.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.A.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>{registers.B.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.B.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.B.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>C</td>
                    <td>{registers.C.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.C.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.C.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>{registers.D.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.D.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.D.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>{registers.E.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.E.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.E.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>H</td>
                    <td>{registers.H.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.H.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.H.toString(2).padStart(8,'0')}`}</td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>{registers.L.toString().padStart(3,'0')}</td>
                    <td>{`0x${registers.L.toString(16).padStart(4,'0')}`}</td>
                    <td>{`${registers.L.toString(2).padStart(8,'0')}`}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

RegisterTable.defaultProps = {
    registers: {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        H: 0,
        L: 0,
    }
  }

export default RegisterTable
