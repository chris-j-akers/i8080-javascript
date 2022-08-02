
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
        <div id='trace-container' className={`${traceDisabled && 'greyed-out'}`}>
            <table id='trace-table' className ={`diag-table`}>
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
                    <div className='scrollable' >
                        <td>
                            {!traceDisabled && trace}
                        <div ref={traceWindowRef} />
                    </td>
                    </div>
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
