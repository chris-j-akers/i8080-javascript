class _8080Disassembler:

    def __init__(self, data):
        self.data = data



romfile = open('../roms/spaceinvaders/invaders.bin','rb').read()
byte_index = 1


for i in range(0, len(romfile)):
    match(romfile[i]):
        case 0x0: 
            print('NOP')
        case 0x1:
            print('LXI\tB,{0}{1}'.format(format(romfile[i+2],'x'), format(romfile[i+1],'x')))
            i+=3
        case 0xC3:
            print('JMP\t{0}{1}'.format(format(romfile[i+2],'x'), format(romfile[i+1],'x')))
        case _:
            print('NOT IMPLEMENTED')
