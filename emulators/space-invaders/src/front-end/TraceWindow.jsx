
import { useEffect, useRef } from 'react'

function TraceWindow({ trace, traceDisabled }) {
    const traceWindowRef = useRef(null);

    const scrollToBottom = () => {
        traceWindowRef.current?.scrollIntoView();
      }

      useEffect(() => {
        scrollToBottom()
      }, [trace]);

    return (
        <div id='trace-container' className={`diag-table-container ${traceDisabled && 'greyed-out'}`}>
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
    </div>
    )
}

TraceWindow.defaultProps = {
    trace: '',
}

export default TraceWindow
