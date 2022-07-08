# i8080-javascript
An Intel 8080 emulator in JavaScript

Needs a web-server to run - I use `python3 -m http.server` or `live-server` from npm. Navigate to the relevant directory and click on the `html` file.

## CPUDIAG

`CPUDIAG` is a program written in 1980 to test the chip itself. You should see `CPU IS OPERATIONAL` pop out at the end. It's better to run it by using the 'Run at Clocked Speed' button because it doesn't take very long and you can see the disassembler output and the registers all being updated.

## Space Invaders

`SPACE INVADERS` is working but has no input devices coded up, yet, so you can just see the title screen and the attract mode demos. Better to run this by using the 'Run all with VBlank Every' button. VBlank interrupts are default to 8ms but you can change this in the screen. 

Clicking 'Stop' pauses the program.

You can trace through each instruction by making sure 'Enable Trace' is clicked and clicking 'Step Next Instruction', but you won't see much because it's such a large program and you need to manually run the Vertical Blank interrupts using the buttons.

## Source
Core of the project is i8080.js which emulates the 8080 chip itself.
