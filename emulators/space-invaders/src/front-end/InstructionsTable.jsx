import { HTMLTable } from '@blueprintjs/core';

function InstructionsTable() {
    return (

        <HTMLTable condensed={true}>
        <thead>
          <tr>
            <th>
              KEY
            </th>
            <th>
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              SHIFT
            </td>
            <td>
              Insert Coin
            </td>
          </tr>
          <tr>
            <td>
              1
            </td>
            <td>
              Player 1 Start
            </td>
          </tr>
          <tr>
            <td>
              2
            </td>
            <td>
              Player 2 Start
            </td>
          </tr>
        </tbody>
      </HTMLTable>
    )
}

export default InstructionsTable