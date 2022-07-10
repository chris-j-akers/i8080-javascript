# i8080-javascript Notes for Now

An Intel 8080 emulator in JavaScript

Main source file is /src/i8080.js

/src/bus.js is object for connecting devices/memory to CPU.
/src/computer.js is object for the emulator (contains CPU, Bus, MMU). Where appropriate, emulators can derive from this object and add additional devices where fit (e.g. Space Ivaders adds input devices and the bit-shift device hardware emulation)

For the programs:

Web-workers are used to run the emulation itself and post message back to the page regarding CPU state updates. This de-couples the emulator from the website and also prevents the browser from locking up when it's running (JS single-threaded execution model FTW!)

## Running programs

ATM only CPUDIAG and Space Invaders available. They needs a web-server to run because of the javascript - I use `python3 -m http.server` or `live-server` from npm. Navigate to the relevant directory and click on the `html` file.

## CPUDIAG

`CPUDIAG` is a program written in 1980 to test the chip itself. You should see `CPU IS OPERATIONAL` pop out at the end. It's better to run it by using the 'Run at Clocked Speed' button because it doesn't take very long and you can see the disassembler output and the registers all being updated.

## Space Invaders

`SPACE INVADERS` is working but input devices not all ready, yet, so you can just see the title screen and the attract mode demos, or press shift to deposit a coing, then '1' for player one start, then CTRL for player one fire. 

For full speed, run this by using the 'Run all with VBlank Every' button. VBlank interrupts are default to 8ms but you can change this in the screen.

Clicking 'Stop' pauses the program.

You can trace through each instruction by making sure 'Enable Trace' is clicked and clicking 'Step Next Instruction', but you won't see much because it's such a large program and you need to manually run the Vertical Blank interrupts using the buttons.

Enable Trace is switched off when running at full speed (either 'Run all with VBLank' or 'Run to breakpoint' because the trace output is so large it will lock up the browser). If you want to see where you are in memory, you can pause the program with 'Stop', then click 'Enable Trace' checkbox, then start 'Step Next Instruction'. Fields and trace should be updated.


