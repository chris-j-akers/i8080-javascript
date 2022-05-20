def generate_mov_reg_to_mem(boilerplate, test):
    return boilerplate.format(reg_source = test['reg_source'])

def generate_adc_acc(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()


def generate_adc_mem(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()


def generate_adc_reg(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()


# def generate_adc_acc(test_suite, working_dir):
#     output_file = f'{working_dir}{test_suite["output_file_name"]}'
#     with open(output_file, 'w') as test_file:
#         test_file.write(test_suite['header'])
#         test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')

#         for test in test_suite['tests']:
#             test_file.write(f'\ttest(\'{test["name"]}\', () => {{\n')

#             for line in test_suite['boiler_plate'].split('\n'):

#                 code = line.format(comment=test['comment'],
#                                     accumulator=test['accumulator'],
#                                     set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
#                                     expected_result=test['expected_result'],
#                                     carry=test['carry'],
#                                     parity=test['parity'],
#                                     auxillary_carry=test['auxillary_carry'],
#                                     zero=test['zero'],
#                                     sign=test['sign']).lstrip()

#                 test_file.write(f'\t\t{code}\n')

#         test_file.write(test_suite['footer'])


# def generate_adc_mem(test_suite, working_dir):
#     output_file = f'{working_dir}{test_suite["output_file_name"]}'
#     with open(output_file, 'w') as test_file:
#         test_file.write(test_suite['header'])
#         test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')

#         for test in test_suite['tests']:
#             test_file.write(f'\ttest(\'{test["name"]}\', () => {{\n')

#             for line in test_suite['boiler_plate'].split('\n'):

#                 code = line.format(comment=test['comment'],
#                                     data=test['data'],
#                                     accumulator=test['accumulator'],
#                                     set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
#                                     expected_result=test['expected_result'],
#                                     carry=test['carry'],
#                                     parity=test['parity'],
#                                     auxillary_carry=test['auxillary_carry'],
#                                     zero=test['zero'],
#                                     sign=test['sign']).lstrip()

#                 test_file.write(f'\t\t{code}\n')

#         test_file.write(test_suite['footer'])


# def generate_adc_reg(test_suite, working_dir):
#     output_file = f'{working_dir}{test_suite["output_file_name"]}'
#     with open(output_file, 'w') as test_file:
#         test_file.write(test_suite['header'])
#         test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')

#         for test in test_suite['tests']:
#             test_file.write(f'\ttest(\'{test["name"]}\', () => {{\n')

#             for line in test_suite['boiler_plate'].split('\n'):

#                 code = line.format(comment=test['comment'],
#                                     data=test['data'],
#                                     accumulator=test['accumulator'],
#                                     set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
#                                     expected_result=test['expected_result'],
#                                     carry=test['carry'],
#                                     parity=test['parity'],
#                                     auxillary_carry=test['auxillary_carry'],
#                                     zero=test['zero'],
#                                     sign=test['sign']).lstrip()

#                 test_file.write(f'\t\t{code}\n')

#         test_file.write(test_suite['footer'])
