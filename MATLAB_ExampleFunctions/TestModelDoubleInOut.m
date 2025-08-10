function [result3, result2] = TestModelDoubleInOut(a, b)
    % Add the two inputs
    sum_ab = a + b;
    
    % Multiply by 3
    result3 = sum_ab * 3;
    % Multiply by 2
    result2 = sum_ab * 2;
end