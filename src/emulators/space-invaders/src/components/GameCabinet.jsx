import Screen from "./game-cabinet-components/Screen"

function GameCabinet({connectScreenToVRAMState, programStatus}) {
  return (
    <div id='game-cabinet-container'>
        <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
    </div>
  )
}

export default GameCabinet
