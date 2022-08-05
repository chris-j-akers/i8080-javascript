def generate_rpo(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                                add=test['add'],
                                expected_program_counter=test['expected_program_counter'],
                                expected_clock=test['expected_clock'],
                                expected_result=test['expected_result'],
                                parity=str(test['parity']).lower());
