codegen TestModelSimple -args {0} -config:dll

codegen TestModelDoubleInput -args {0,0} -config:dll

codegen TestModelDoubleInOut.m -args {0,0} -config:dll

codegen TestModelSingleInOutVariable.m -args {0} -config:dll

codegen TestModelSingleInOutArray.m -args {coder.typeof(0, [1, 3])} -config:dll