import config

def generate_sub_acc(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                accumulator=test['accumulator'],
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())


def generate_sub_reg(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                data=test['data'],
                                accumulator=test['accumulator'],
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())

def generate_sub_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr = config.MAX_MEM_ADDR,
                                comment=test['comment'],
                                data=test['data'],
                                accumulator=test['accumulator'],
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())