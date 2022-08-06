

- [Description](#description)
- [Why JavaScript?](#why-javascript)
- [Core Components](#core-components)
- [Implementing Space Invaders](#implementing-space-invaders)
  - [Components](#components)
  - [Video](#video)
    - [Video Buffer](#video-buffer)
    - [Roated Screen](#roated-screen)
- [Set-up Unit Testing](#set-up-unit-testing)

---
# Description

Briefly, this repo contains the following:

* An Intel 8080 CPU emulator written in JavaScript, plus various other components that can be used to build a virtual machine with the Intel 8080 as its processor.

* A 'Space Invaders' emulator which uses the 8080 virtual machine components to run the original 1978 game ROM in a modern web browser using React (all client-side). To see this in action, visit: http://8080.cakers.io.

* A 'CPU Diag' emulator that also runs on a the 8080 virtual machine components. 'CPU Diag' is a piece of software written in 1980 by Kelly Smith of Microcosm Associates and it tests that the 8080 chip OpCodes are working correctly. The version in this repo runs on a simple static website which requires a web-server to run (e.g. 'live-server' or `python -m SimpleHTTPServer`).

* Unit tests for nearly all of the 8080 operations in 'Mocha' format and the unit test generator Python app.

---
# Why JavaScript?

Originally, this project was started in `C`. After all, this was the language most people seemed to write their emulators in and can also serve to illustrate just how fucking hard-core we all are when it comes to programming, but as I got going a few issues became visible on the horizon:

1) Time is a factor. I have a family and work on the emulator could only really be done when a couple of hours were snatched each evening or during nap-time.

2) Emulating 8080 software, in particular games, means a requirement to draw graphics, play sounds and control sprites. For C, some sort of display library like `SDL` would have to be leanred whereas a modern web browser has all this capability built-in and uses a ubiquitouspresentation lanugage.

3) I wanted people to be able to access the emulator easily and not have to download some executable and all the hand-wringing secuity issues that would entail plus I didn't want to have to provide a set of exeuctables for different OS types

4) Chromium-based browsers have great dev tools built in. It was either that or spending some quality time with GDB.

---
# Core Components

Computer, MMU, Bus, i8080, Device

DIAGRAM

---
# Implementing Space Invaders

'Space Invaders' seemed a logical, if slightly cliched choice for emulation. It also has a great write-up on [Computer Archeology](https://www.computerarcheology.com/Arcade/SpaceInvaders/) and there are a few other implementations out there so, if I got stuck, I had references available. The [Hardware](https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html) section in the above link provides the most useful information along with a few suprises.

---

## Components

![Space Invaders UML](/documentation/diagrams/uml-diagrams/space-invaders-uml.drawio.png)

## Video

### Video Buffer

Old style arcade machines would reserve a certain section of RAM as video memory and write the current screen image to that memory, updating it regularly to give the illusion of movement. Some of the first machines, like the 8080 Space Invaders one being emulated here, would simply use a stream of bits where '1' means a display pixel is visible, or 'on' and '0' means it is not visible, or 'off'. This obviously means the display is black and white only, so where do the colours come from in the screen images that can be found when searching the web? At the time, the effect was achieved by simply sticking coloured cellaphane over certain sections of the monitor inside the cabinet. We can produce this effect by colouring our pixels depending on where they are being drawn and may do this later.

According to [Computer Archeaology](https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html), the 8080 'Space Invaders' video memory is located betwen addresses `0x2400` and `0x3FFF`. How is that memory interpreted into the screen image? For older analogue displays, hardware in the computer would read these secionts of RAM and interpret them into electronic signals that are sent to the monitor in the cabinet. These signals are drawn from left to right for each line on the screen and then top to bottom. This is also known as the scanline. When the scanline reaches the bottom, it has finished drawing the screen and sends a signal back to the CPU in the form of an interrupt. This interrupt basically tells the CPU it has about 16ms to redraw the screen again before the scanline will start again from the top.

It's important the scanline is synchronised with the software in this way or tears will be seen in the screen image as the scan line draws out a frame that is still being updated.

When the game was in action, the scanline of the monitor would interpret the 

### Roated Screen

Another interesting tit-bit discovered when reading about Space Invaders is the fact that the video buffer is drawn out sidways, at a 90 degree angle. To compensate for this, the monitor in the original cabinet was physically roated 90 degrees.


# Set-up Unit Testing

Unit tests cover nearly all the 8080 operations. They are generated from config that can be found in the `/utils/test_generator' directory. The `test_generator.py` app is a python program that reads YAML config files to generate JavaScript unit tests.

Unit tests are written to: `/src/unit_tests`. Mocha should be installed (`npm install`) before they can be executed:

```
i8080-javascript/src/unit_tests on  main [!] 
➜ npm run test
```

All tests should pass.


