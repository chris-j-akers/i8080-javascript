import config

def generate_pop(boilerplate, test):
    return boilerplate.format(register_high=test['register_high'],
                              register_low=test['register_low']);


def generate_pop_psw(boilerplate, test):
    return boilerplate.format(set_carry = "c.cpu._flag_manager.SetFlag(FlagType.Carry);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);\n" 
                                if test['set_carry'] 
                                else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);\n",
                              set_parity = "c.cpu._flag_manager.SetFlag(FlagType.Parity);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);\n" 
                                if test['set_parity'] 
                                else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);\n",
                              set_auxillary_carry = "c.cpu._flag_manager.SetFlag(FlagType.AuxillaryCarry);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);\n" 
                                if test['set_auxillary_carry'] 
                                else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);\n",
                              set_zero = "c.cpu._flag_manager.SetFlag(FlagType.Zero);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);\n" 
                                if test['set_zero'] 
                                else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);\n",
                              set_sign = "c.cpu._flag_manager.SetFlag(FlagType.Sign);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);\n" 
                                if test['set_sign'] 
                                else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);\n",
                              carry=str(test['carry']).lower(),
                              parity=str(test['parity']).lower(),
                              auxillary_carry=str(test['auxillary_carry']).lower(),
                              zero=str(test['zero']).lower(),
                              sign=str(test['sign']).lower())

