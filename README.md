

- [Description](#description)
- [Why JavaScript?](#why-javascript)
- [Core Components](#core-components)
  - [Class Diagram](#class-diagram)
- [Testing](#testing)
- [Implementing Space Invaders](#implementing-space-invaders)
  - [Components](#components)
  - [Space Invaders Class Diagram](#space-invaders-class-diagram)
  - [Video](#video)
    - [Video Buffer](#video-buffer)
    - [Roated Screen](#roated-screen)
    - [Efficiency](#efficiency)
  - [Additional Hardware](#additional-hardware)
    - [Bit-Shift Device](#bit-shift-device)
    - [Controller Devices](#controller-devices)
  - [Front-End](#front-end)
    - [Implementing the Web Worker](#implementing-the-web-worker)
- [References and Sources](#references-and-sources)

---
# Description

Briefly, this repo contains the following:

* An Intel 8080 CPU emulator written in JavaScript, plus various other components that can be used to build a virtual machine with the Intel 8080 as its processor.

* A 'Space Invaders' emulator which uses the 8080 virtual machine components to run the original 1978 game ROM in a modern web browser using React (all client-side). To see this in action, visit: http://8080.cakers.io.

* A 'CPU Diag' emulator that also runs on a the 8080 virtual machine components. 'CPU Diag' is a piece of software written in 1980 by Kelly Smith of Microcosm Associates to test that the 8080 chip is in full working order. The version in this repo runs in a simple static website, but it does require a running web-server to use (albeit a simple one such as 'live-server' or `python -m SimpleHttpServer`).

* Unit tests for nearly all of the 8080 operations in 'Mocha' format and the unit test generator Python app.

* An app to convert 8080 ROM binary files into JavaScript arrays of bytes.

---
# Why JavaScript?

Originally, this project was started in `C`. After all, research suggested this was the language most people wrote their emulators in and it would also serve to illustrate just how fucking hard-core I am when it comes to programming, but as I got going a few issues appeared on the horizon:

- Emulating 8080 software, in particular games, means drawing graphics, playing sounds and controlling sprites. For C, some sort of display library like `SDL` would have to be used and, therefore, studied, whereas a modern web browser has all that capability built-in and can easily controlled using a well-known and ubiquitous scripting language.

- This is a personal research project, but I still want people to be able to access a demo easily without having to download an executable and deal with all the hand-wringing secuity issues that entails, plus I didn't want to have to provide a set of exeuctables for different OS types. This way, I can just stick it on the web. For instance, here: [http://8080.cakers.io](http://8080.cakers.io).

- Chromium-based browsers have great dev tools built in. It was either that or spending some more quality time with `GDB` which - and I'm sorry - just isn't pretty enough.

- Time is a factor. I have a family and work on the emulator could only really be done when a couple of hours were snatched each evening or during nap-time (the baby's, not mine). I didn't want to spend those precious few hours chasing down endless, fucking segmentation errors. A high-level language is better suited to this rapid-development requirement.

---
# Core Components





Computer, MMU, Bus, i8080, Device

## Class Diagram

![Core UML](/documentation/diagrams/uml-diagrams/core-uml.drawio.png)

---
# Testing

Unit tests cover nearly all the 8080 operations. They are generated from config that can be found in the `/utils/test_generator' directory. The `test_generator.py` app is a python program that reads YAML config files to generate JavaScript unit tests.

Unit tests are written to: `/src/unit_tests`. Mocha should be installed (`npm install`) before they can be executed:

```
i8080-javascript/src/unit_tests on  main [!] 
➜ npm run test
```

All tests should pass.



---
# Implementing Space Invaders

'Space Invaders' seemed a logical, if slightly cliched choice for emulation. It also has a great write-up on [Computer Archeology](https://www.computerarcheology.com/Arcade/SpaceInvaders/) and there are a few other implementations out there so, if I got stuck, I had references available. The [Hardware](https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html) section in the above link provides the most useful information along with a few suprises.

---

## Components

## Space Invaders Class Diagram

![Space Invaders UML](/documentation/diagrams/uml-diagrams/space-invaders-uml.drawio.png)

## Video



### Video Buffer

In the good old days, computer software would reserve a certain section of RAM as video memory and write the current screen image to that memory.

According to [Computer Archeaology](https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html), the 8080 'Space Invaders' video memory is located betwen addresses `0x2400` and `0x3FFF`. How is that memory interpreted into the screen image? For older analogue displays, hardware in the computer would read these sections of RAM and interpret them into electronic signals that are sent to the monitor in the cabinet. The monitor draws the image one line at a time from the top down. When the last line at the bottom of the screen has been drawn, an interrupt is sent to the CPU called a 'Vertical Blank'. This essentially diverts the CPU, telling it to stop whatever its doing and update the video memory with the next frame to get ready for the next time the screen is redrawn. It is critical that the screen updates are in sync with the video ram updates to avoid a side-effect known as 'screen-tearing'. Imagine if the monitor has just drawn the top of a sprite at position 0,1 but, before it finished, the video RAM updates it to position 0,5. The rest of the sprite will be drawn in the wrong position making it look disjointed or 'torn'.

The CPU typically had about 16ms to update video memory before another attempt was made to re-draw the screen. All this happens so quickly, of course, that to the user it just looks like the blips and blobs on the screen are moving around. 

It's important the scanline is synchronised with the software in this way or image tearing will be seen on the display as the scan line draws out a frame that is still being updated in memory.

Each pixel in the display is represented by 1 bit of display memory. If the bit is `0` then the pixel is off, or black, if it's `1` then it is on, or white. Screenshots and photographs of the early arcade machine may show the aliens and player's spaceship in different colours, but that was just a trick acheived by sticking coloured cellophane over certain sections of the cabinet's monitor. Space Invaders is a black and white ganme.

 Some of the first machines, like the 8080 Space Invaders one being emulated here, would simply use a stream of bits where '1' means a display pixel is visible, or 'on' and '0' means it is not visible, or 'off'. This obviously means the display is black and white only, so where do the colours come from in the screen images that can be found when searching the web? At the time, the effect was achieved by simply sticking coloured cellaphane over certain sections of the monitor inside the cabinet. We can produce this effect by colouring our pixels depending on where they are being drawn and may do this later.

 These signals are drawn from left to right for each line on the screen and then top to bottom. This is also known as the scanline. When the scanline reaches the bottom, it has finished drawing the screen and sends a signal back to the CPU in the form of an interrupt. This interrupt basically tells the CPU it has about 16ms to redraw the screen again before the scanline will start again from the top.



When the game was in action, the scanline of the monitor would interpret the 

### Roated Screen

Another interesting tit-bit discovered when reading about Space Invaders is the fact that the video buffer is drawn out sidways, at a 90 degree angle. To compensate for this, the monitor in the original cabinet was physically roated 90 degrees.

### Efficiency

Because the game runs in b&w we can save time by simply blacking out the canvas rectable and only drawing the white pixels.

## Additional Hardware

The Space Invaders arcade machine included some additional, custom hardware that connected to the 8080 through device ports.

### Bit-Shift Device

### Controller Devices

## Front-End

### Implementing the Web Worker



# References and Sources

* OneLonleyCoder
* Emulator101.com
* A guide to the game boy half-carry flag
https://robdor.com/2016/08/10/gameboy-emulator-half-carry-flag/

* Binary/decimal to hex converter: https://www.mathsisfun.com/binary-decimal-hexadecimal-converter.html

* Intel opCode list: https://pastraiser.com/cpu/i8080/i8080_opcodes.html

* https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html

