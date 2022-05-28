import config

def generate_shld(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR);
