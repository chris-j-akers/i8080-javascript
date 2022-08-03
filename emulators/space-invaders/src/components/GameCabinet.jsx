import Logo from "./game-cabinet-components/Logo"
import Screen from "./game-cabinet-components/Screen"

function GameCabinet({connectScreenToVRAMState, programStatus}) {
  return (
    <div id='game-cabinet-container'>
        <Logo />
        <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
    </div>
  )
}

export default GameCabinet
