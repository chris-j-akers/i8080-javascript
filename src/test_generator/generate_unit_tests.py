from asyncio.format_helpers import _get_function_source
from cgi import test
import yaml
import glob, os

def generate_mov_reg_test_suite(test_suite):
    output_file = test_suite['output_file_name']
    with open(output_file, 'w') as test_file:
        test_file.write(test_suite['header'])
        test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')

        for test in test_suite['tests']:
            test_file.write(f'\ttest(\'{test["name"]}\', () => {{\n')

            for line in test_suite['boiler_plate'].split('\n'):
                code = line.format(reg_source = test['reg_source'], reg_destination=test['reg_destination'])
                test_file.write(f'\t\t{code}\n')

        test_file.write(test_suite['footer'])

def generate_mov_mem_test_suite(test_suite):
    pass


def main():
    for file in glob.glob('./*.yaml'):
        with open(file) as yaml_file:
            test_suite = yaml.safe_load(yaml_file)['test_suite'];
            print('Generating test suite: {0}'.format(test_suite['description']))
            generator_function = '{0}(test_suite)'.format(test_suite['generator_function'])
            exec(generator_function)


if __name__ == '__main__':
    main()