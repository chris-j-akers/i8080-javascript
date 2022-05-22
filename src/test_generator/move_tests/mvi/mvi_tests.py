import config

def generate_mvi_reg(boilerplate, test):
    return boilerplate.format(reg_destination=test['reg_destination'])

def generate_mvi_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR)
