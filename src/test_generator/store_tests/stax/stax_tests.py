import config

def generate_stax_b(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                                register_high_byte=test['register_high_byte'],
                                register_low_byte=test['register_low_byte'],
                                stax_function=test['stax_function'])
