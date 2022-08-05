import config
def generate_ldax(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                            high_byte_register=test['high_byte_register'],
                            low_byte_register=test['low_byte_register'])
