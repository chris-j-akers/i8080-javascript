def generate_add_reg(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                    accumulator=test['accumulator'],
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()