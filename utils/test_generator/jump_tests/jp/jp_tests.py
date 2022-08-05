def generate_jp(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                                add=test['add'],
                                expected_program_counter=test['expected_program_counter'],
                                expected_clock=test['expected_clock'],
                                expected_result=test['expected_result'],
                                sign=str(test['sign']).lower());
