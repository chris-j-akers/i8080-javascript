def generate_jz(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                                subtract=test['subtract'],
                                expected_program_counter=test['expected_program_counter'],
                                expected_clock=test['expected_clock'],
                                expected_result=test['expected_result'],
                                zero=str(test['zero']).lower());
