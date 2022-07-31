
import { useEffect, useRef, useState } from 'react'
import { Checkbox } from "@blueprintjs/core";

function TraceWindow({ trace, programStatus }) {
    const [traceDisabled, toggleTraceDisabled] = useState(false);
    const traceWindowRef = useRef(null);

    const scrollToBottom = () => {
        traceWindowRef.current?.scrollIntoView();
      }

      useEffect(() => {
        scrollToBottom()
      }, [trace]);

    return (
        <div className={`diag-table-container trace-container ${traceDisabled && 'greyed-out'}`}>
            <table className ={`diag-table trace-table`}>
                <caption>
                    Disassembly
                </caption>
                <thead>
                    <tr>
                        <th>ADDR/OPCODE/OPERAND(S)</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className='scrollable' >
                            {!traceDisabled && trace}
                        <div ref={traceWindowRef} />
                        </div>
                    </td>
                </tr>
                </tbody>
                <tfoot>{'(Last 1000 Instructions)'}</tfoot>
            </table>
            <Checkbox onChange={() => toggleTraceDisabled(!traceDisabled)} className='trace-disable-checkbox' defaultChecked={false} label='Disable Trace' large={true}/>
    </div>
    )
}

TraceWindow.defaultProps = {
    trace: '',
}

export default TraceWindow
