

- [Description](#description)
- [Why JavaScript?](#why-javascript)
- [Core Components](#core-components)
  - [`i8080.js`](#i8080js)
  - [`mmu.js`](#mmujs)
  - [`bus.js`](#busjs)
  - [`device.js`](#devicejs)
  - [Core Component Class Diagram](#core-component-class-diagram)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
    - [The Unit Test Generator (`test_generator.py`)](#the-unit-test-generator-test_generatorpy)
  - [Running Unit Tests](#running-unit-tests)
  - [Unit Test Methodology](#unit-test-methodology)
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

In `/src/core`, the following JavaScript classes can be used to make-up a virtual machine that runs an 8080 CPU. 

## `i8080.js`

The 8080 CPU component which emulates all 8080 operations and contains a few debug functions that output strings related to the current state of the CPU. It also contains a method for executing an 8080 program, including adjusting the program counter.

## `mmu.js`

A simple class used to store the RAM of the machine (in a `Number` `Array`) and provide an interface for reading and writing to that RAM.

## `bus.js`

A class used to connect the CPU, MMU and any added devices together. CPU operations that use RAM, for instance, only interact with the bus which passes the request to the `MMU`.

Devices are added to `Read` and `Write` arrays in positions that reflect the ports they are hooked up to. For instance, the 'Space Invaders' custom bit-shift device (see below) is added to the `Read` array at positions `2` and `4` and the `Write` array at position `3`. These are the three ports it uses to communicate with the CPU via the `IN` and `OUT` opcodes.

## `device.js`

An abstract class that provides an interface for any device that needs to be connected to the bus. This just ensures each device provides a `Read()` and a `Write()` method.

## Core Component Class Diagram

The class diagram, below, shows the core components and how they're related to each other.

![Core UML](/documentation/diagrams/uml-diagrams/core-uml.drawio.png)

---
# Testing

## Unit Tests 

Unit tests cover nearly all the 8080 operations. They are generated from config that can be found in the `/utils/test_generator` directory.

### The Unit Test Generator (`test_generator.py`)

The unit test generator takes a series of `YAML` config files which consist of various sets of common boilerplate code, set-up values and expected values. It uses this config to generate Mocha test-suites in JavaScript.

The first part of the `YAML` file (the `test_suite` section) contains the test suite configuration global to all tests such as the boilerplate test code. The second part of the file (the `tests` section) contains configuration for each test, usually a list of placeholders and their values.

For example, below is the `test_suite` section of the configuration file for the `LXI` opcode unit tests.

```yaml
---
test_suite:
  enable: True
  generator_function: lxi_tests.generate_lxi
  description: 'LXI Register'
  output_file_name: '/load/lxi.reg.test.js'
  header: |
    import { Computer } from '../../core/computer.js'
    import { strict as assert } from 'assert'
  footer: |
    });
  boilerplate: |
    const max_value_to_test = {max_value_to_test};
    const c = new Computer();

    let program = [
      {opcode},      // LXI into {msb_register}/{lsb_register}...
      null,          // ...low-byte of 16-bit data (inserted, below)
      null,          // ...high-byte of 16-bit data (inserted, below)
      0x76           // HALT
    ]

    for (let word = 0x0000; word <= max_value_to_test; word++) {{
      program[1] = word & 0xFF;
      program[2] = (word >> 8) & 0xFF;

      c.LoadProgram(program);
      c.ExecuteProgram();

      assert.equal(c.CPUState.Registers.{msb_register}, (word >> 8) & 0xFF);
      assert.equal(c.CPUState.Registers.{lsb_register}, word & 0xFF);
      assert.equal(word, (c.CPUState.Registers.{msb_register} << 8) | c.CPUState.Registers.{lsb_register});
      
      assert.equal(c.CPUState.Clock, 17);
      c.Reset();

    }}
    }});
```
The table below describes each field.

| Key                | Description                                                                                                            |
|--------------------|------------------------------------------------------------------------------------------------------------------------|
| `enable`             | Whether or not to actually generate this test                                                                          |
| `generator_function` | The name of the function in the `test_generator.py` application that will be used to generate this test.               |
| `description`        | Brief description of the test                                                                                          |
| `output_file_name`   | The full path and name of the resulting test suite file (should end in `.js`)                                          |
| `header`             | Any code that should be at the top of the test file (usually import statements or global variables required)           |
| `footer`             | Any code that should be at the bottom of the test file                                                                 |
| `boilerplate`        | The test code itself. This should include placeholders for any values that would change according to the test running. |

To actually generate a test, the `tests` section of the configuration file should contain subsections similar to the following:

```yaml
    - test:
      name: LXI B,d16
      comment: 
      msb_register: B
      lsb_register: C
      opcode: 0x01
```
The fields `name` and `comment` are test metadata (although `name` is used when created the Mocha test function itself). The others are placeholders in the testsuite boilerplate code and the values they should be replaced with.

Configuring the tests in this way allowed me to quickly design and produce tests for a number of scenarios that had very similar boilerplate code without having to manually write out each test. Furthermore, if found a problem with one of the tests or wanted to make a change to the code, I only needed to do this in one place.

It is far from perfect, but still saved a lot of time. The application along with its config can be found in `/util/test_generator`.

## Running Unit Tests
Unit tests are written to: `/src/unit_tests` and require Mocha to run (`npm install`). To execute all tests, should be as simple as:

```bash
i8080-javascript/src/unit_tests on  main [!] 
➜ npm run test
```
There are 428 tests in total and all should pass cleanly.

## Unit Test Methodology
Unit tests are written to closley resemble the way the i8080 programs would be executed. Instead of directly accessing internal members of the i8080 class to set-up, execute and tear-down tests, we use small binary programs stored in arrays that consist of a sequence of 8080 opcodes and operands. Basically, Unit teests are all mini 8080 executables.

For instance, one of the tests to check the `JNC` (Jump if Carry Not Set) command executes this sequence of bytes stored in an array called `program`.

```javascript
		let program = [
		  0x3E,                   // MVI into accumulator
		  255,                    // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes if a jump occurs)
		  0xC6,                   // ADI...
		  10,                     // ...This immediate value to accumulator
		  0xD2,                   // JNC
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		  0x76,                   // HALT
		]
```
The above sequence executes the following on the 8080 CPU:

1. Load the immediate value `255` (`0xFF`) into the accumulator (the largest number it can store).
2. Load a 16bit memory address (`0x26FF`) into the `H` and `L` registers
3. Call the `MVI` command to load immediate value `0x76` (the HALT opcode) into the 16bit address now loaded into the `H` and `L` registers (`0x26FF`).
4. Add the immediate value `10` (`0xA`) to the accumulator, which should set the CPU Carry bit.
5. Call the `JNC` instruction. 

The expected result of this test is that a jump should *not* occur becaue the carry bit was set during the `ADD` operation in step 4. The test will, therefore, check that the CPU's program counter contains the expected address.

This method of testing ensures that the emulator is tested as close to real operation as possible.

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

According to [Computer Archeaology](https://www.computerarcheology.com/Arcade/SpaceInvaders/Hardware.html), the 8080 'Space Invaders' video memory is located betwen addresses `0x2400` and `0x3FFF`. How is that memory interpreted into the screen image? For older analogue displays, hardware in the computer would read these sections of RAM and interpret them into electronic signals that are sent to the monitor in the cabinet. The monitor draws the image one line at a time from the top down. When the last line at the bottom of the screen has been drawn, an interrupt is sent to the CPU called a 'Vertical Blank'. This essentially diverts the CPU, telling it to stop whatever its doing and update the video memory with the next frame. It is critical that the screen updates are in sync with the video ram updates to avoid a side-effect known as 'screen-tearing'. Imagine if the monitor has just drawn the top of a sprite at position 0,1 but, before it finished, the video RAM updates it to position 0,5. The rest of the sprite will be drawn in the wrong position making it look disjointed or 'torn'.

The CPU typically had about 16ms to update video memory before another attempt was made to re-draw the screen. All this happens so quickly, of course, that to the user it just looks like the blips and blobs on the screen are moving around. 

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

