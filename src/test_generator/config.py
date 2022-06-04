OUTPUT_DIRECTORY='../__tests__'

# A number of instructions received or put data into memory. This setting establishes how
# many memory locations should be tested in each test.
#
# 8080 has 16-but memory addresses, so can address up to 0xFFFF locations, but testing 
# each one can take time. The value, here, can be used to lower the number so that any 
# broader bugs can be found without having to wait too long for the tests to complete.
MAX_MEM_ADDR=0x00FF

# When loading values into memory or registers, set how many values, here (e.g. 0-255/0xFF)
MAX_VAL_TO_TEST=0x0FFF