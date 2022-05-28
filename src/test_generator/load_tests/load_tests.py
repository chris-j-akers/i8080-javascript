import config
def generate_lxi(boilerplate, test):
    return boilerplate.format(max_value_to_test=config.MAX_VAL_TO_TEST,
                            msb_register=test['msb_register'],
                            lsb_register=test['lsb_register'])

def generate_lxi_sp(boilerplate, test):
    return boilerplate.format(max_value_to_test=config.MAX_VAL_TO_TEST)