def generate_dcx(boilerplate, test):
    return boilerplate.format(
            opcode=test['opcode'],
            register_high_byte=test['register_high_byte'],
            register_low_byte=test['register_low_byte'])

def generate_dcx_sp(boilerplate, test):
    return boilerplate
