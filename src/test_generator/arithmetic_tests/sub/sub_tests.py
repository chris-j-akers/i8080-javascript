import config

# def generate_adc_acc(boilerplate, test):
#     return boilerplate.format(comment=test['comment'],
#                                     accumulator=test['accumulator'],
#                                     set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
#                                     expected_result=test['expected_result'],
#                                     carry=test['carry'],
#                                     parity=test['parity'],
#                                     auxillary_carry=test['auxillary_carry'],
#                                     zero=test['zero'],
#                                     sign=test['sign']).lstrip()


# def generate_adc_mem(boilerplate, test):
#     return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
#                                     comment=test['comment'],
#                                     data=test['data'],
#                                     accumulator=test['accumulator'],
#                                     set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
#                                     expected_result=test['expected_result'],
#                                     carry=test['carry'],
#                                     parity=test['parity'],
#                                     auxillary_carry=test['auxillary_carry'],
#                                     zero=test['zero'],
#                                     sign=test['sign']).lstrip()

def generate_sub_acc(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                accumulator=test['accumulator'],
                                expected_result=test['expected_result'],
                                carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                                parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                                auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                                zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                                sign='toBeTruthy' if test['sign'] else 'toBeFalsy')


def generate_sub_reg(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    expected_result=test['expected_result'],
                                    carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                                    parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                                    auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                                    zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                                    sign='toBeTruthy' if test['sign'] else 'toBeFalsy')

def generate_sbb_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                                    comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    expected_result=test['expected_result'],
                                    carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                                    parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                                    auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                                    zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                                    sign='toBeTruthy' if test['sign'] else 'toBeFalsy')