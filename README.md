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


