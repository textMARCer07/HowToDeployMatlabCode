import ctypes
import datetime
import time


#Save the Starting Time for total time calculation and print the timestamp from start
start_time =time.time()
print(datetime.datetime.now())

#Load the First TestScript for multiplying a single input by 7
#FirstModel_dll = ctypes.CDLL('./TestModelSimple.dll')
FirstModel_dll = ctypes.CDLL('$DIRECTORY/TestModelSimple.dll')
#Specify the inputs and outputs
FirstModel_dll.TestModelSimple.argtypes = [ctypes.c_double]  # Specify input type
FirstModel_dll.TestModelSimple.restype = ctypes.c_double    # Specify output type
#Set a value for your input, execute the main Function and output the result
input_value = 4
result = FirstModel_dll.TestModelSimple(input_value)
print("Result:", result)


#Load the second TestScript for adding two input values and multiplying the result by 9
#SecondModel_dll = ctypes.CDLL('./TestModelDoubleInput.dll')
SecondModel_dll = ctypes.CDLL('$DIRECTORY/TestModelDoubleInput.dll')
#Specify the inputs and outputs
SecondModel_dll.TestModelDoubleInput.argtypes = [ctypes.c_double, ctypes.c_double]
SecondModel_dll.TestModelDoubleInput.restype = ctypes.c_double
#Set a value for both inputs, execute the main Function and output the result
input_value1 = 5
input_value2 = 7
#result2 = SecondModel_dll.TestModelDoubleInput(ctypes.c_double(input_value1), ctypes.c_double(input_value2))
result2 = SecondModel_dll.TestModelDoubleInput(input_value1, input_value2)
print("Result:", result2)


#Load the third script for two in- and outputs
#ThirdModel_dll = ctypes.CDLL('./TestModelDoubleInOut.dll')
ThirdModel_dll = ctypes.CDLL('$DIRECTORY/TestModelDoubleInOut.dll')
#Specify the inputs and outputs
ThirdModel_dll.TestModelDoubleInOut.argtypes = [ctypes.c_double, ctypes.c_double, ctypes.POINTER(ctypes.c_double), ctypes.POINTER(ctypes.c_double)]
#ThirdModel_dll.TestModelDoubleInOut.restype = [ctypes.c_double, ctypes.c_double]
#Set a value for both inputs, prepare output values for later writing and execute the main Function and output the result
input_value3 = 2
input_value4 = 5
#Prepare an instance of the expected output thats written by the pointer inside the C-function
result3 = ctypes.c_double()
result4 = ctypes.c_double()
ThirdModel_dll.TestModelDoubleInOut(input_value3, input_value4, ctypes.byref(result3), ctypes.byref(result4))
print("Result multiplied by 3:", result3.value)
print("Result multiplied by 2:", result4.value)


#Load the fourth script for single variable, that functions as in- and output
FourthModel_dll = ctypes.CDLL('$DIRECTORY/TestModelSingleInOutVariable.dll')
#Specify the function argument
FourthModel_dll.TestModelSingleInOutVariable.argtypes = [ctypes.POINTER(ctypes.c_double)]
#Set an initial input inside an allocated double-variable
input_value5 = ctypes.c_double(7)
FourthModel_dll.TestModelSingleInOutVariable(ctypes.byref(input_value5))
print("Result multiplied by 12:", input_value5.value)


#Load the fifth script for single array, that also functions as in- and output
FifthModel_dll = ctypes.CDLL('$DIRECTORY/TestModelSingleInOutArray.dll')
#Function to convert a Python list to a ctypes array
def create_ctypes_array(py_array):
    array_type = ctypes.c_double * len(py_array)  #Create type matching length
    return array_type(*py_array)  #Instantiate with values
#Create a list as the input array
array_list = [2, 7, 9]
#Create ctypes array
input_array = create_ctypes_array(array_list)
#Specify the function argument
FifthModel_dll.TestModelSingleInOutArray.argtypes = [ctypes.POINTER(ctypes.c_double)]
#Call the function
FifthModel_dll.TestModelSingleInOutArray(input_array)
#Output all three numbers
print(f"A1 ({array_list[0]}) * A2 ({array_list[1]}) = {input_array[0]}")
print(f"A2 ({array_list[1]}) * A3 ({array_list[2]}) = {input_array[1]}")
print(f"A3 ({array_list[2]}) * A1 ({array_list[0]}) = {input_array[2]}")

#Calculate and print the Time passed during execution
end_time = time.time()
CalcTime = (end_time - start_time) / 60
Shortened_CalcTime = round(CalcTime, 2)
print("--- %s minutes ---" % Shortened_CalcTime)