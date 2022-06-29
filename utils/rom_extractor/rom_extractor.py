import sys

def extract(rom_path):

    BYTE_COUNT_PER_LINE = 10

    rom_data = None
    with open(rom_path, 'rb') as rom_file:
        rom_data = bytearray(rom_file.read())

    byte_count = 0;
    with open('out.js', 'w') as out_file:
        out_file.write('const Code = [\n\t')
        for byte in rom_data:
            if byte_count > BYTE_COUNT_PER_LINE:
                out_file.write('\n\t')
                byte_count = 0
            out_file.write('{0},'.format(hex(byte)))
            byte_count += 1
        out_file.write('];\n')
        out_file.write('export { Code };')

def usage():
    print('USAGE: python3 rom_extractor.py [path-to-rom-file] [output-directory]')

def main():
    if len(sys.argv) != 3:
        usage()
        exit()
    extract(sys.argv[1], sys.argv[2])

if __name__ == '__main__':
    main()