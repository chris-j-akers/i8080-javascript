## Description

Briefly, this repo contains the following:

* An Intel 8080 CPU emulator written in JavaScript, plus various other components that can be used to build a virtual machine with the Intel 8080 as its processor. 

* A 'Space Invaders' emulator which uses 8080 virtual machine components and React to run the original 1978 game ROM in a modern web browser (all client-side). To see this in action, visit: http://8080.cakers.io.

* A working version of 'CPUDiag' that runs on a virtual 8080 machine, a program written in 1980 to test the Intel 8080 Processer. The version in this repo is a simple, static website which requires a simple web-server to get it running (e.g. 'live-server' or `python -m SimpleHTTPServer`.

* Unit tests for nearly all of the 8080 operations in 'Mocha' format.


## Set-up Unit Testing

Unit tests cover nearly all the 8080 operations. They are generated from config that can be found in the `/utils/test_generator' directory. The `test_generator.py` app is a python program that reads YAML config files to generate JavaScript unit tests.

Unit tests are written to: `/src/unit_tests`. Mocha should be installed (`npm install`) before they can be executed:

```
i8080-javascript/src/unit_tests on  main [!] 
➜ npm run test
```

All tests should pass.

## Running the Emulator
## Running the CPU Diag Program



## Repo Contents

`/src`

Core emulator and virtual machine code. Includes `i8080.js`.

`/src/__tests__`

Unit tests. These tests should not be modified directly as they are generated by the `test_generator` tool described below.

`/src/test_generator`

A python app and configuration for generating all unit tests used when writing `i8080.js`. This app allows multiple permutations of tests to be generated for each 8080 OpCode without having to manually type out thousands of lines of boiler-plate. The tests are configured using Yaml files and the tool `gen_i8080_unit_tests.py` reads the files and spits out the required JavaScript code to the `/src/__tests__` directory. Unit tests are written for 'Mocha', so this needs to be installed using `npm`.

`/roms/`

Original binary dumps of ROMs. Note that the emulator cannot read these directly as it would mean accesing client's file-systems. Instead they are converted to JavaScript arrays of bytes using the tool found in `/utils/rom_extractor`.

`/utils/`

Utilities used to assist with writing the emulator. Currently contains just the code for the `rom_extractor` (see above) which extracts bytes from binary ROM dumps and converts them into JavaScript arrays so they can be imported and read by the emulator.

`/emulators`

Actual software emulators that use the 8080 components found in this repo to run 8080 software. Currently just contains one application which emulates the original 'Space Invaders' ROM through a browser.

