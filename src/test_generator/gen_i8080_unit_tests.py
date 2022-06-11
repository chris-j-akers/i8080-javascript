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
import arithmetic_tests.sbi.sbi_tests as sbi_tests
import arithmetic_tests.sui.sui_tests as sui_tests
import arithmetic_tests.aci.aci_tests as aci_tests
import arithmetic_tests.adi.adi_tests as adi_tests
import arithmetic_tests.inx.inx_tests as inx_tests
import arithmetic_tests.inr.inr_tests as inr_tests
import arithmetic_tests.dcr.dcr_tests as dcr_tests
import arithmetic_tests.dcx.dcx_tests as dcx_tests
import arithmetic_tests.dad.dad_tests as dad_tests
import load_tests.lxi.lxi_tests as lxi_tests
import load_tests.ldax.ldax_tests as ldax_tests
import load_tests.lhld.lhld_tests as lhld_tests
import load_tests.lda.lda_tests as lda_tests
import logical_tests.ana.ana_tests as ana_tests
import logical_tests.ani.ani_tests as ani_tests
import logical_tests.xra.xra_tests as xra_tests
import logical_tests.xri.xri_tests as xri_tests
import logical_tests.ora.ora_tests as ora_tests
import logical_tests.ori.ori_tests as ori_tests
import store_tests.stax.stax_tests as stax_tests
import store_tests.shld.shld_tests as shld_tests
import store_tests.sta.sta_tests as sta_tests
import rotate_tests.rlc.rlc_tests as rlc_tests
import rotate_tests.rrc.rrc_tests as rrc_tests
import rotate_tests.ral.ral_tests as ral_tests
import rotate_tests.rar.rar_tests as rar_tests
import carry_bit_tests.cmc.cmc_tests as cmc_tests
import carry_bit_tests.stc.stc_tests as stc_tests
import complement_tests.cma.cma_tests as cma_tests
import arithmetic_tests.dad.dad_tests as dad_tests


def generate_test(test_suite, working_dir, populate_function):
    output_file = f'{working_dir}{test_suite["output_file_name"]}'
    with open(output_file, 'w') as test_file:
        test_file.write(f'{test_suite["header"]}\n')
        test_file.write(f'describe(\'{test_suite["description"]}\', () => {{\n')
        for test in test_suite['tests']:
            test_file.write(f'\tit(\'{test["name"]}\', () => {{\n')
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