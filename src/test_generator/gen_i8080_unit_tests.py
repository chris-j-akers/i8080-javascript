import yaml
from pathlib import Path

# Our test modules
import config
import move_tests.mov.mov_tests as mov_tests
import move_tests.mvi.mvi_tests as mvi_tests
import arithmetic_tests.adc.adc_tests as adc_tests
import arithmetic_tests.add.add_tests as add_tests
import arithmetic_tests.sbb.sbb_tests as sbb_tests
import arithmetic_tests.sub.sub_tests as sub_tests
import load_tests.load_tests as load_tests
import logical_tests.ana.ana_tests as ana_tests


def generate_test(test_suite, working_dir, populate_function):
    output_file = f'{working_dir}{test_suite["output_file_name"]}'
    with open(output_file, 'w') as test_file:
        test_file.write(test_suite['header'])
        test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')
        for test in test_suite['tests']:
            test_file.write(f'\ttest(\'{test["name"]}\', () => {{\n')
            boilerplate = eval('{function}({p1},{p2})'.format(function=populate_function, p1="test_suite['boilerplate']", p2="test"))
            for line in boilerplate.split('\n'):
                test_file.write(f'\t\t{line}\n')
        test_file.write(test_suite['footer'])
    
def main():
    print(f'searching for YAML config files')
    for file in Path('./').rglob('*.yaml'):
        with open(file) as yaml_file:
            test_suite = yaml.safe_load(yaml_file)['test_suite'];
            if test_suite['enable'] == True:
                print('generating test suite from: {0}'.format(file))
                generator_function = test_suite['generator_function']
                generate_test(test_suite, config.OUTPUT_DIRECTORY, generator_function)

if __name__ == '__main__':
    main()