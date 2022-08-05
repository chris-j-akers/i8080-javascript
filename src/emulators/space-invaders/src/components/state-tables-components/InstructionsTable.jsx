import { HTMLTable } from '@blueprintjs/core';

function InstructionsTable() {
    return (
        <table id='instructions-table'>
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
              CTRL
            </td>
            <td>
              Player 1 Fire
            </td>
          </tr>
          <tr>
            <td>
              Left Cursor
            </td>
            <td>
              Player 1 Left
            </td>
          </tr>
          <tr>
            <td>
              Right Cursor
            </td>
            <td>
              Player 1 Right
            </td>
          </tr>
        </tbody>
      </table>
    )
}

export default InstructionsTable