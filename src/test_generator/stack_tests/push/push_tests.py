import config

def generate_push(boilerplate, test):
    return boilerplate.format(register_high=test['register_high'],
                              register_low=test['register_low']);
