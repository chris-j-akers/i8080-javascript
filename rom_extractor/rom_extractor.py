import sys

def extract(program_name, rom_path, output_directory):
    rom_data = None
    with open(rom_path, 'rb') as rom_file:
        rom_data = bytearray(rom_file.read())

    with open('{0}/{1}.js'.format(output_directory, program_name), 'w') as out_file:
        out_file.write('const {0}_program = ['.format(program_name))
        for byte in rom_data:
            out_file.write('{0},\n'.format(hex(byte)))
        out_file.write('];')

def usage():
    print('USAGE: python3 rom_extractor.py [name-of-program] [path-to-rom-file] [output-directory]')

def main():
    if len(sys.argv) != 4:
        usage()
        exit()
    extract(sys.argv[1], sys.argv[2], sys.argv[3])

if __name__ == '__main__':
    main()