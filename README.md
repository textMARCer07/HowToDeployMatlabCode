# HowToDeployMatlabCode
This Repository gives a tutorial on how to deploy MATLAB-Code within other languages.
Provided are five example-functions deployed in Python and JavaScript.

The underlying workflow can be used to deploy MATLAB-Functions in every language, that provides any sort of usage of C-Code.
The workflow makes use of the "MATLAB Coder"-Toolbox to create a library with using C-Code (.dll or .so) containing the translated functions and necessary function-depencies.
<br>

## Explanation of Function-Functionality:
###### All following calculations should be read "mathematically" and not logically (refer to the provided .m-files for latter)

### TestModelSimple:
The first Function takes one input value and multiplies it by 7
###### input * 7 = result  
<br>

### TestModelDoubleInput:
The Second function takes two inputs, adds them and multiplies the addition by 9
###### (input_1 + input_2) * 9 = result
<br>

### TestModelDoubleInOut:
The third function takes two inputs, adds them together and multiplies the addition with 3 and 2, creating two seperate results
###### (input_1 + input_2) * 3 = result_1
###### (input_1 + input_2) * 2 = result_2
<br>

### TestModelSingleInOutVariable:
The fourth function takes an input and multiplies it with 12, but storing the information in the same variable, not creating a new one
###### input_1 * 12 = input_1
<br>

### TestModelSingleInOutArray:
The fifth function takes an array of size 3 and changes each number to a new multiplication according to the following rules:
###### array_1 * array_2 = array_1
###### array_2 * array_3 = array_2
###### array_3 * array_1 = array_3
<br>
