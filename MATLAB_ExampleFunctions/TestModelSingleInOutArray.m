function input_array = TestModelSingleInOutArray(input_array)
    % This function takes an input array with a length of 3

    buffer_one = input_array(1);
    input_array(1) = input_array(1) * input_array(2);
    input_array(2) = input_array(2) * input_array(3);
    input_array(3) = input_array(3) * buffer_one;

end
