def generate_mov_reg_to_reg(boilerplate, test):
    return boilerplate.format(reg_source = test['reg_source'], reg_destination=test['reg_destination'])

def generate_mov_acc_to_reg(boilerplate, test):
    return boilerplate.format(reg_destination=test['reg_destination'])

def generate_mov_reg_to_acc(boilerplate, test):
    return boilerplate.format(reg_source=test['reg_source'])

def generate_mov_mem_to_reg(boilerplate, test):
    return boilerplate.format(reg_destination=test['reg_destination'])

def generate_mov_reg_to_mem(boilerplate, test):
    return boilerplate.format(reg_source = test['reg_source'])
