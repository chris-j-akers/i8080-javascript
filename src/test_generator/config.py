# This file contains configuration values global to all test-suites and set as
# the suites are generated.

# The root directory for each tests (tests are then seperated into
# sub-directories which can be found in the config for each individual
# test-suite).
OUTPUT_DIRECTORY='../__tests__'

# A number of instructions read or store data into memory. This setting
# establishes how many memory locations should be tested for each of those
# instructions.
#
# 8080 has a 16-bit bus, so can address up to 0xFFFF locations, but testing each
# one can take time. The value, here, can be used to lower the number so that
# any broader bugs can be found without having to wait too long for the tests to
# complete.
#
# Generally, it's good to test more than 255 locations because a lot of the the
# memory operations in the 8080 depend on building a 16-bit address from the
# values in register pairs and if the high-byte is always going to be 00000000
# because we're only testing up to 255 locations (for example) then bugs could
# be missed during this process.

# Additionally, the Mocha timeout may need to be increased if each memory
# location is to be tested or it will fail the tests (timeout default is 2000).
MAX_MEM_ADDR=0x0FFF

# When loading values into memory or registers, set how many values to test
# with, here (e.g. 0-255/0xFF). All memory locations and registers can store up
# to 1 byte (8-bits).
MAX_VAL_TO_TEST=0xFF