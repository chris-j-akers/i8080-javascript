import config

def generate_ana_reg(boilerplate, test):
    return boilerplate.format(data=test['data'],
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                        parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                        auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                        zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                        sign='toBeTruthy' if test['sign'] else 'toBeFalsy')

def generate_ana_acc(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                        parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                        auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                        zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                        sign='toBeTruthy' if test['sign'] else 'toBeFalsy')

def generate_ana_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                        data=test['data'],
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                        parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                        auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                        zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                        sign='toBeTruthy' if test['sign'] else 'toBeFalsy')