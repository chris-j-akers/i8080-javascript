def generate_rst(boilerplate, test):
    return boilerplate.format( opcode=test['opcode'],
                               vector_address=test['vector_address'],
                               expected_program_counter=test['expected_program_counter'])
