import config

def generate_stax(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                                msb_register=test['msb_register'],
                                lsb_register=test['lsb_register'])
