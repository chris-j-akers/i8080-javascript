
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
        <div className={`${traceDisabled && 'greyed-out'}`}>
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
                    <td>
                        <div className='scrollable'>
                            {!traceDisabled && trace}
                        <div ref={traceWindowRef} />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

TraceWindow.defaultProps = {
    trace: '',
}

export default TraceWindow
