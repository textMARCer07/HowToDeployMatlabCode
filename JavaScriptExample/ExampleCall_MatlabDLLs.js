//Load The corresponding library
const koffi = require('koffi');


//    *****   Preparation for Data handling, assigning and reading values/arrays multiple times    *****   

// Function to create a buffer of doubles dynamically adjusting to the size of the chosen variable -> working with arrays and single values
function createDoubleBuffer(data) {
  if (!Array.isArray(data)) {
    data = [data];
  }
  const buf = Buffer.alloc(data.length * 8); // 8 bytes per double
  data.forEach((val, i) => {
    buf.writeDoubleLE(val, i * 8);
  });
  return buf;
}

// Function to read a buffer into variable dynamically adjusting to size -> working with arrays and single values
function readDoubleBuffer(buf, count = null) {
  // If no length is given, derive from buffer size
  const len = count !== null ? count : buf.length / 8;

  const out = [];
  for (let i = 0; i < len; i++) {
    out.push(buf.readDoubleLE(i * 8));
  }

  // Return a single number if only one value
  return out.length === 1 ? out[0] : out;
}



//    *****   Test the First SimpleModel    *****   

//Load the Library
const TestModelSimple_dll = koffi.load('$DIRECTORY/TestModelSimple.dll');

// Define the function (As of the .c-file)
const TestModelSimple = TestModelSimple_dll.func('double TestModelSimple(double input_value)');
// Cleaner alternative: TestModelSimple_dll.func('double TestModelSimple(double)');

//SimpleModel takes the input and multiplies it by 7
const result1 = TestModelSimple(3); //expected: 21
//Log result1
console.log('Result:', result1); //expected: 21





//    *****   Test the Second DoubleInputSingleOutputModel    *****   

//Load the DLL
const TestModelDoubleInput_dll = koffi.load('$DIRECTORY/TestModelDoubleInput.dll');

// Define the function (As of the .c-file)
const TestModelDoubleInput = TestModelDoubleInput_dll.func('double TestModelDoubleInput(double input1, double input2)');
// Cleaner alternative:      TestModelDoubleInput_dll.func('double TestModelDoubleInput(double, double)');

//DoubleInputModel takes both inputs, adds them together and multiplies that by 9
const result2 = TestModelDoubleInput(5, 3); //expected: 72
//Log result2
console.log('Result:', result2); //expected: 72





//    *****   Test the Third DoubleInputDoubleOutputModel    *****   

//Load the DLL
const TestModelDoubleInOut_dll = koffi.load('$DIRECTORY/TestModelDoubleInOut.dll');
// Define the function (As of the .c-file)
const TestModelDoubleInOut = TestModelDoubleInOut_dll.func('void TestModelDoubleInOut(double a, double b, double *result3, double *result2)');
// Cleaner alternative:      TestModelDoubleInOut_dll.func('void TestModelDoubleInOut(double, double, double*, double*)');

// Allocate buffers to hold the output values at function-call
const out1 = Buffer.alloc(8); //8 Bytes for double
const out2 = Buffer.alloc(8); //8 Bytes for double
/*// Alternative: Use own function for Buffering
const out1 = createDoubleBuffer();
const out2 = createDoubleBuffer();*/

// Call the function with two input doubles
TestModelDoubleInOut(9, 6, out1, out2);

//DoubleInOutModel takes two inputs, adds them together and
//multiplies them by 3 for the first output and by 2 for the second output 
const result3_1 = out1.readDoubleLE(); //expected: 45
const result3_2 = out2.readDoubleLE(); //expected: 30
//Alternative with own Function:
/*msg.result3_1 = readDoubleBuffer(out1); 
msg.result3_2 = readDoubleBuffer(out2); */

// Read the output values
console.log('Multiplied by 3:', result3_1); //expected: 45
console.log('Multiplied by 2:', result3_2); //expected: 30





//    *****   Test the Fourth SingleInOutVariable    *****   

// Load the fourth DLL
const TestModelSingleInOutVariable_dll = koffi.load('$DIRECTORY/TestModelSingleInOutVariable.dll');

// Define the function (As of the .c-file)
const TestModelSingleInOutVariable = TestModelSingleInOutVariable_dll.func('void TestModelSingleInOutVariable(double *input_value)');
// Cleaner alternative:              TestModelSingleInOutVariable_dll.func('void TestModelSingleInOutVariable(double*)');

// Assign and allocate the Input
const input_value5 = createDoubleBuffer(7);
/*      Alternative without own function:
const input_value5 = Buffer.alloc(8); //8 Bytes for double
input_value5.writeDoubleLE(7.0); //Write Value 7      */

//Call the function
TestModelSingleInOutVariable(input_value5);

const updated_input_value5 = readDoubleBuffer(input_value5);
// Add to .msg-object
console.log('Multiplied by 12:', updated_input_value5); //expected: 84





//    *****   Test the Fifth SingleInOutArray    *****   

// Load the fifth DLL
const TestModelSingleInOutArray_dll = koffi.load('$DIRECTORY/TestModelSingleInOutArray.dll');

// Define the function (As of the .c-file)
const TestModelSingleInOutArray = TestModelSingleInOutArray_dll.func('void TestModelSingleInOutArray(double *input_array)'); //Function Declaration copy-pasted from C-Code
// Cleaner alternative:           TestModelSingleInOutArray_dll.func('void TestModelSingleInOutArray(double*)');

// Assign and allocate the Input-Values
const input_array = createDoubleBuffer([2, 7, 9]);

// Call the function
TestModelSingleInOutArray(input_array);

//Read the new values written inside the C-Function
const updated_array = readDoubleBuffer(input_array, input_array.length / 8); //Divide the array-length by 8 bytes per double

// Log the updated array
console.log("Expected: 14, 63, 18");
console.table(updated_array);


