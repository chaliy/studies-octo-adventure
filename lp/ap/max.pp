var 
    current:Integer;
    max:Integer;
    n:Integer;
label
    start;
begin
    
    current:= 0;
    max:= -32768;
    n:= 0;

start:

    if (n < 4) then
    begin

        write('Enter next number: ');
        readln(current);

        if (current > max) then
            max:= current;

        n:= n + 1;
        
        goto start;

    end;

    writeln('>Max: ', max);
end.