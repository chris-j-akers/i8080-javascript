import config


def generate_dcr_reg(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                expected_result=test['expected_result'],
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())

def generate_dcr_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr = config.MAX_MEM_ADDR,
                                data=test['data'],
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())