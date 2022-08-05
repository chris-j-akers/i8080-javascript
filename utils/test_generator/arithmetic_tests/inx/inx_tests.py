def generate_inx(boilerplate, test):
    return boilerplate.format(
            opcode=hex(test['opcode']),
            register_high_byte=test['register_high_byte'],
            register_low_byte=test['register_low_byte'])

def generate_inx_sp(boilerplate, test):
    return boilerplate
