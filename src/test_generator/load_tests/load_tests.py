def generate_lxi(boilerplate, test):
    return boilerplate.format(opcode_function=test['opcode_function'],
                            high_byte_register=test['high_byte_register'],
                            low_byte_register=test['low_byte_register'])

def generate_lxi_sp(boilerplate, test):
    return boilerplate