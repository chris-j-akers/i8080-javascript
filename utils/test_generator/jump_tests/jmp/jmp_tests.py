def generate_jmp(boilerplate, test):
    return boilerplate.format(  expected_program_counter=test['expected_program_counter'],
                                expected_clock=test['expected_clock'])
