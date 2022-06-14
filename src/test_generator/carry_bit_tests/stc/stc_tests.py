def generate_stc(boilerplate, test):
        return boilerplate.format(
                    set_carry = "c.cpu._flag_manager.SetFlag(FlagType.Carry);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);\n" 
                        if test['set_carry'] 
                        else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);\n")
