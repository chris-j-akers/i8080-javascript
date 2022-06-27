import config

def generate_pop(boilerplate, test):
    return boilerplate.format(register_high=test['register_high'],
                              register_low=test['register_low']);


def generate_pop_psw(boilerplate, test):
    return boilerplate.format(set_carry = "c._cpu._flagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);\n" 
                                if test['set_carry'] 
                                else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);\n",
                              set_parity = "c._cpu._flagManager.SetFlag(FlagType.Parity);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), true);\n" 
                                if test['set_parity'] 
                                else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);\n",
                              set_auxillary_carry = "c._cpu._flagManager.SetFlag(FlagType.AuxillaryCarry);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);\n" 
                                if test['set_auxillary_carry'] 
                                else "assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);\n",
                              set_zero = "c._cpu._flagManager.SetFlag(FlagType.Zero);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);\n" 
                                if test['set_zero'] 
                                else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);\n",
                              set_sign = "c._cpu._flagManager.SetFlag(FlagType.Sign);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);\n" 
                                if test['set_sign'] 
                                else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);\n",
                              carry=str(test['carry']).lower(),
                              parity=str(test['parity']).lower(),
                              auxillary_carry=str(test['auxillary_carry']).lower(),
                              zero=str(test['zero']).lower(),
                              sign=str(test['sign']).lower())

