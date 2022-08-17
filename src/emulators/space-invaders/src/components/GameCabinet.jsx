import Screen from "./game-cabinet-components/Screen"
import InstructionsTable from "./state-tables-components/InstructionsTable"

function GameCabinet({connectScreenToVRAMState, programStatus}) {
  return (
    <>
    <div id='game-cabinet-container'>
        <div id='game-cabinet-screen-container'>
          <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
        </div>
        <div id='instruction-card-container'>
          <InstructionsTable />
        </div>

    </div>
    </>
  )
}

export default GameCabinet
