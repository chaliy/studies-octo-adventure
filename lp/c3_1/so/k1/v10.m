function [x,fval] = v10()

    f = @(x) -1.0 * (2.5 * x(1) + 4.0 * x(2) + 10 * x(3));
    
    function [c, ceq] = confun(x)
        % Nonlinear inequality constraints
        c = [0.3 * x(1) + 0.5 * x(2) + 2.0 * x(3) - 2400;     
             x(1) - 310;
             x(2) - 1900;
             x(3) - 900];
        % Nonlinear equality constraints
        ceq = [];
    end

    x0 = [0,0,0];
    options = optimoptions(@fmincon,'Algorithm','sqp');
    [x,fval] = fmincon(f,x0,[],[],[],[],[],[],@confun,options);

end